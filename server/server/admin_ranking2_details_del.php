<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

</body>
</html>
<?php
session_start();
$userid=$_SESSION['userid'];
include ('mysqli_connect.php');


$delid=$_GET['id'];
$share_id = $_GET['share_id'];
echo $delid;
    $sql = "delete from add_number where id={$delid} ;";
	$sql2 = "update share_rank set sum = sum-1;"
	$res2 = mysqli_query($dbc, $sql2);
    $res = mysqli_query($dbc, $sql);

    if ($res == 1) {
        echo "<script>alert('删除成功！')</script>";
        echo "<script>window.location.href='admin_ranking2.php'</script>";
    }
    else {
        echo "删除失败！";
        echo "<script>window.location.href='admin_ranking2.php'</script>";
    }

?>
