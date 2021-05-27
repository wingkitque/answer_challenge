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
    <title>答题小程序 || 参数信息</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <style>
      body{
            width: 100%;
            overflow: hidden;
            background: url("bg_parameter.jpg") no-repeat;
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
                        <li><a href="admin_ranking2.php">分享排行</a></li>
                    </ul>
                </li>
				<li class="active"><a href="admin_parameter.php">参数设置</a></li>
				<li><a href="admin_feedback.php">意见反馈</a></li>
				<li><a href="admin_password.php">修改密码</a></li>
                <li><a href="index.php">退出</a></li>
            </ul>
        </div>
    </div>
</nav>
<h1 style="text-align: center"><strong>参数管理</strong></h1>
<form  id="query" action="admin_question.php" method="POST">
    <div id="query">
        <label ><input  name="questionquery" type="text" placeholder="请输入参数关键字" class="form-control"></label>
        <input type="submit" value="查询" class="btn btn-default">
    </div>
</form>
<table  width='100%' class="table table-hover">
    <tr>
        <th>序号</th>
		<th>答题状态</th>
        <th>题目数量</th>
        <th>答题时间</th>
        <th>修改操作</th>

<!--		<th>音频路径</th>
        <th>视频路径</th>  -->

    </tr>
    <?php



    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $keyword = $_POST["questionquery"];

        $sql="select * from parameter where (id like '%{$keyword}%') ;";

    }
    else{
        $sql="select * from parameter order by id";
    }


    $res=mysqli_query($dbc,$sql);
    foreach ($res as $row){
        echo "<tr>";
        echo "<td>{$row['id']}</td>";
		if($row['status']=='1') echo "<td>尚未开始</td>"; 
		elseif($row['status']=='0') echo "<td>正在答题</td>"; 
		elseif($row['status']=='2') echo "<td>答题结束</td>";
        echo "<td>{$row['question_num']}</td>";
        echo "<td>{$row['time_use']}</td>";
//		echo "<td>{$row['music_url']}</td>";
//		echo "<td>{$row['video_url']}</td>";
        
        echo "<td><a href='admin_parameter_edit.php?id={$row['id']}'>修改</a></td>";
        echo "</tr>";
    };
    ?>
</table>
</body>
</html>