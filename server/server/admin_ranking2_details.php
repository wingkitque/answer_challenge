<?php
session_start();
$userid=$_SESSION['userid'];
include ('mysqli_connect.php');
date_default_timezone_set("PRC");
if(!$userid){
	echo "<script>window.location.href='index.php'</script>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>答题小程序 || 分享排行榜</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <style>
         body{
            width: 100%;
            overflow: hidden;
            background: url("bg_rank.jpg") no-repeat;
            background-size:cover;
            
        }
        #query{
            text-align: center;
        }
    </style>
</head>
<body>
<nav class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">答题小程序管理系统</a>
        </div>
        <div>
            <ul class="nav navbar-nav">
                <li><a href="admin_index.php">主页</a></li>
				<li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">题目管理<b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="admin_question.php">全部题目</a></li>
                        <li><a href="admin_question_add.php">增加题目</a></li>
                    </ul>
                </li>
				<li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">排行榜<b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="admin_ranking.php">答题排行</a></li>
                        <li class="active"><a href="admin_ranking2.php">分享排行</a></li>
                    </ul>
                </li>
				<li><a href="admin_parameter.php">参数设置</a></li>
				<li><a href="admin_feedback.php">意见反馈</a></li>
				<li><a href="admin_password.php">修改密码</a></li>
                <li><a href="index.php">退出</a></li>
            </ul>
        </div>
    </div>
</nav>
<h1 style="text-align: center"><strong>排行榜管理</strong></h1>
<form  id="query" action="admin_question.php" method="POST">
    <div id="query">
        <label ><input  name="query" type="text" placeholder="请输入关键字" class="form-control"></label>
        <input type="submit" value="查询" class="btn btn-default">
    </div>
</form>
<table  width='100%' class="table table-hover">
    <tr>
	<th>排名</th>
        <th>邀请人openid</th>
		<th>被邀请openid</th>
        <th>时间</th>
    </tr>
    <?php

$share_id=$_GET['share_id'];

    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $keyword = $_POST["query"];

        $sql="select * from add_number where (share_id like '%{$keyword}%') ;";

    }
    else{
        $sql="select * from add_number where share_id='{$share_id}'";
    }


    $res=mysqli_query($dbc,$sql);
	$index = 1;
    foreach ($res as $row){
        echo "<tr>";
        echo "<td>$index</td>";
		echo "<td>{$row['share_id']}</td>";
        echo "<td>{$row['openid']}</td>";
        echo "<td>{$row['time']}</td>";
       
/*        echo "<td>{$row['time_use']}秒</td>";
		 echo "<td>{$row['time']}</td>"; */
        echo "</tr>";
		$index = $index + 1;
    };
    ?>
</table>
</body>
</html>