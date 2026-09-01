<?php
// upload.php - Upload ke folder aploq/profile/ dengan data.json
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS');

// ===== KONFIGURASI =====
$uploadDir = 'aploq/profile/';
$dataFile = $uploadDir . 'data.json';
$maxFileSize = 30 * 1024 * 1024; // 30MB
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];

// ===== API KEY VALIDASI =====
$VALID_API_KEYS = [
    'RIZXOTPNOKOS_2024_SECURE_KEY_001',
    'RIZXOTPNOKOS_2024_SECURE_KEY_002',
    'RIZXOTPNOKOS_2024_SECURE_KEY_003'
];

function validateApiKey() {
    global $VALID_API_KEYS;
    
    $headers = getallheaders();
    $apiKey = null;
    
    if (isset($headers['X-API-Key'])) {
        $apiKey = $headers['X-API-Key'];
    } elseif (isset($headers['Api-Key'])) {
        $apiKey = $headers['Api-Key'];
    } elseif (isset($headers['Authorization'])) {
        $auth = $headers['Authorization'];
        if (strpos($auth, 'Bearer ') === 0) {
            $apiKey = substr($auth, 7);
        }
    }
    
    if (!$apiKey && isset($_GET['api_key'])) {
        $apiKey = $_GET['api_key'];
    }
    
    if (!$apiKey && isset($_POST['api_key'])) {
        $apiKey = $_POST['api_key'];
    }
    
    if (!$apiKey || !in_array($apiKey, $VALID_API_KEYS)) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'API Key tidak valid atau tidak ditemukan',
            'message' => 'Gunakan header X-API-Key atau Bearer token'
        ]);
        exit;
    }
    
    return true;
}

// ===== FUNGSI AUTO CREATE FOLDER DAN DATA.JSON =====
function initializeStorage() {
    global $uploadDir, $dataFile;
    
    // 1. Buat folder jika belum ada
    if (!file_exists($uploadDir)) {
        if (!mkdir($uploadDir, 0777, true)) {
            return [
                'success' => false,
                'error' => 'Gagal membuat folder: ' . $uploadDir
            ];
        }
        chmod($uploadDir, 0777);
    }
    
    // 2. Buat data.json jika belum ada
    if (!file_exists($dataFile)) {
        $defaultData = [
            'created_at' => date('Y-m-d H:i:s'),
            'total_files' => 0,
            'files' => []
        ];
        if (file_put_contents($dataFile, json_encode($defaultData, JSON_PRETTY_PRINT)) === false) {
            return [
                'success' => false,
                'error' => 'Gagal membuat data.json'
            ];
        }
        chmod($dataFile, 0666);
    }
    
    return ['success' => true];
}

// ===== FUNGSI BACA DATA.JSON =====
function readDataFile() {
    global $dataFile;
    
    if (!file_exists($dataFile)) {
        return ['files' => []];
    }
    
    $content = file_get_contents($dataFile);
    return json_decode($content, true) ?: ['files' => []];
}

// ===== FUNGSI TULIS DATA.JSON =====
function writeDataFile($data) {
    global $dataFile;
    return file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT)) !== false;
}

// ===== VALIDASI API KEY =====
if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
    validateApiKey();
}

// ===== INISIALISASI STORAGE =====
$init = initializeStorage();
if (!$init['success']) {
    echo json_encode($init);
    exit;
}

// ===== GET: List semua file dari data.json =====
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readDataFile();
    
    // Tambahkan URL lengkap untuk setiap file
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $port = $_SERVER['SERVER_PORT'];
    $portStr = ($port != 80 && $port != 443) ? ':' . $port : '';
    $baseUrl = $protocol . '://' . $host . $portStr;
    
    $files = [];
    foreach ($data['files'] as $file) {
        $file['url'] = $baseUrl . '/' . $uploadDir . $file['filename'];
        $files[] = $file;
    }
    
    echo json_encode([
        'success' => true,
        'total' => count($files),
        'files' => $files,
        'storage_info' => [
            'folder' => $uploadDir,
            'data_file' => $dataFile,
            'created_at' => $data['created_at'] ?? date('Y-m-d H:i:s')
        ]
    ]);
    exit;
}

// ===== DELETE: Hapus file dan update data.json =====
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['filename'])) {
        echo json_encode([
            'success' => false,
            'error' => 'Filename tidak ditemukan'
        ]);
        exit;
    }
    
    $filename = basename($input['filename']);
    $filePath = $uploadDir . $filename;
    
    // Baca data.json
    $data = readDataFile();
    
    // Cari file di data
    $foundIndex = -1;
    foreach ($data['files'] as $index => $file) {
        if ($file['filename'] === $filename) {
            $foundIndex = $index;
            break;
        }
    }
    
    if ($foundIndex === -1) {
        echo json_encode([
            'success' => false,
            'error' => 'File tidak ditemukan di data.json'
        ]);
        exit;
    }
    
    // Hapus file fisik
    if (!file_exists($filePath)) {
        // Hapus dari data.json saja jika file sudah tidak ada
        array_splice($data['files'], $foundIndex, 1);
        $data['total_files'] = count($data['files']);
        writeDataFile($data);
        
        echo json_encode([
            'success' => true,
            'message' => 'File sudah tidak ada, data dihapus dari database',
            'filename' => $filename
        ]);
        exit;
    }
    
    if (unlink($filePath)) {
        // Hapus dari data.json
        array_splice($data['files'], $foundIndex, 1);
        $data['total_files'] = count($data['files']);
        writeDataFile($data);
        
        echo json_encode([
            'success' => true,
            'message' => 'File berhasil dihapus',
            'filename' => $filename
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Gagal menghapus file'
        ]);
    }
    exit;
}

// ===== POST: Upload file dan simpan ke data.json =====
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Cek apakah ada file yang diupload
    if (!isset($_FILES['fileToUpload']) || $_FILES['fileToUpload']['error'] !== UPLOAD_ERR_OK) {
        $errorMsg = 'Gagal upload file';
        if (isset($_FILES['fileToUpload']['error'])) {
            switch ($_FILES['fileToUpload']['error']) {
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    $errorMsg = 'File melebihi maksimal upload (30MB)';
                    break;
                case UPLOAD_ERR_PARTIAL:
                    $errorMsg = 'File hanya terupload sebagian';
                    break;
                case UPLOAD_ERR_NO_FILE:
                    $errorMsg = 'Tidak ada file yang diupload';
                    break;
                case UPLOAD_ERR_NO_TMP_DIR:
                    $errorMsg = 'Folder temporary tidak ditemukan';
                    break;
                case UPLOAD_ERR_CANT_WRITE:
                    $errorMsg = 'Gagal menulis file';
                    break;
                case UPLOAD_ERR_EXTENSION:
                    $errorMsg = 'Upload dihentikan oleh ekstensi PHP';
                    break;
                default:
                    $errorMsg = 'Unknown error: ' . $_FILES['fileToUpload']['error'];
            }
        }
        echo json_encode([
            'success' => false,
            'error' => $errorMsg
        ]);
        exit;
    }

    $file = $_FILES['fileToUpload'];
    
    // Validasi ukuran file
    if ($file['size'] > $maxFileSize) {
        echo json_encode([
            'success' => false,
            'error' => 'Ukuran file terlalu besar. Maksimal 30MB',
            'max_size_mb' => 30,
            'file_size_mb' => round($file['size'] / 1024 / 1024, 2)
        ]);
        exit;
    }

    // Validasi tipe file
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mimeType, $allowedTypes)) {
        echo json_encode([
            'success' => false,
            'error' => 'Tipe file tidak diizinkan. Gunakan: JPG, PNG, GIF, atau WEBP',
            'allowed_types' => $allowedTypes,
            'detected_type' => $mimeType
        ]);
        exit;
    }

    // Generate nama file unik
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $username = isset($_POST['username']) ? preg_replace('/[^a-zA-Z0-9_]/', '', $_POST['username']) : 'user';
    $timestamp = time();
    $uniqueId = uniqid();
    $newFileName = $username . '_' . $timestamp . '_' . $uniqueId . '.' . $extension;
    $targetPath = $uploadDir . $newFileName;

    // Pindahkan file
    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        echo json_encode([
            'success' => false,
            'error' => 'Gagal menyimpan file'
        ]);
        exit;
    }

    // Baca data.json
    $data = readDataFile();
    
    // Simpan metadata ke data.json
    $fileData = [
        'filename' => $newFileName,
        'original_name' => $file['name'],
        'username' => $username,
        'size' => $file['size'],
        'size_mb' => round($file['size'] / 1024 / 1024, 2),
        'mime_type' => $mimeType,
        'uploaded_at' => date('Y-m-d H:i:s'),
        'timestamp' => $timestamp,
        'unique_id' => $uniqueId
    ];
    
    $data['files'][] = $fileData;
    $data['total_files'] = count($data['files']);
    $data['last_upload'] = $fileData;
    
    if (!writeDataFile($data)) {
        // Hapus file yang sudah diupload jika gagal simpan data
        unlink($targetPath);
        echo json_encode([
            'success' => false,
            'error' => 'Gagal menyimpan metadata ke data.json'
        ]);
        exit;
    }

    // Generate URL
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $port = $_SERVER['SERVER_PORT'];
    $portStr = ($port != 80 && $port != 443) ? ':' . $port : '';
    $baseUrl = $protocol . '://' . $host . $portStr;
    $url = $baseUrl . '/' . $targetPath;

    echo json_encode([
        'success' => true,
        'url' => $url,
        'filename' => $newFileName,
        'size' => $file['size'],
        'size_mb' => round($file['size'] / 1024 / 1024, 2),
        'mime_type' => $mimeType,
        'path' => $targetPath,
        'username' => $username,
        'uploaded_at' => date('Y-m-d H:i:s'),
        'message' => 'File berhasil diupload ke aploq/profile/'
    ]);
    exit;
}

// Method tidak diizinkan
http_response_code(405);
echo json_encode([
    'success' => false,
    'error' => 'Method tidak diizinkan',
    'allowed_methods' => ['GET', 'POST', 'DELETE']
]);
?>