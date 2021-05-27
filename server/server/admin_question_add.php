<?php
session_start();
$userid=$_SESSION['userid'];
include ('mysqli_connect.php');
if(!$userid){
	echo "<script>window.location.href='index.php'</script>";
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <title>答题小程序 || 增加题目</title>
	 <style>
        body{
            width: 100%;
            overflow: hidden;
            background: url("bg_question.jpg") no-repeat;
            background-size:cover;
            
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
                        <li class="active"><a href="admin_question_add.php">增加题目</a></li>
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
				<li><a href="admin_parameter.php">参数设置</a></li>
				<li><a href="admin_feedback.php">意见反馈</a></li>
				<li><a href="admin_password.php">修改密码</a></li>
                <li><a href="index.php">退出</a></li>
            </ul>
        </div>
    </div>
</nav>
<h1 style="text-align: center"><strong>增加题目</strong></h1>
<div style="padding: 10px 500px 10px;">
    <form  action="admin_question_add.php" method="POST" style="text-align: center" class="bs-example bs-example-form" role="form">
        <div id="login">
            <div class="input-group"><span class="input-group-addon">问题</span><input name="question" type="text" placeholder="请输入问题" class="form-control"></div><br/>
			
			<div class="input-group"><span class="input-group-addon">题目类型</span>
			<select class="form-control" name="type" id="type">
			<option value="1">文字题</option>
			<option value="2">音频题</option>
			<option value="3">视频题</option>
			<option value="4">图片题</option>
		</select>
</div></br>
			<div class="input-group"><span class="input-group-addon">选项A</span><input name="A" type="text" placeholder="请输入选项A" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">选项B</span><input name="B" type="text" placeholder="请输入选项B" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">选项C</span><input name="C" type="text" placeholder="请输入选项C" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">选项D</span><input name="D" type="text" placeholder="请输入选项D" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">答案</span><input name="answer" type="text" placeholder="请输入答案" class="form-control"></div><br/>
			<div class="input-group"><span class="input-group-addon">音频路径</span><input name="music_url" type="text" placeholder="请输入音频路径" class="form-control"></div><br/>
			<div class="input-group"><span class="input-group-addon">视频路径</span><input name="video_url" type="text" placeholder="请输入视频路径" class="form-control"></div><br/>
			<div class="input-group"><span class="input-group-addon">图片路径</span><input name="pic_url" type="text" placeholder="请输入图片路径" class="form-control"></div><br/>
            <input type="submit" value="添加" class="btn btn-default">
            <input type="reset" value="重置" class="btn btn-default">
        </div>
    </form>
</div>
<?php

$time = date('Y-m-d H:i:s');

if ($_SERVER["REQUEST_METHOD"] == "POST")
{

    $question= $_POST["question"];
	$type= $_POST["type"];
    $A = $_POST["A"];
    $B= $_POST["B"];
    $C= $_POST["C"];
    $D = $_POST["D"];
	$answer= $_POST["answer"];
    $music_url= $_POST["music_url"];
    $video_url = $_POST["video_url"];
	$pic_url = $_POST["pic_url"];
	
	if($type == "1"){
		$sql="insert into question VALUES (null,'{$question}','{$A}','{$B}','{$C}','{$D}','{$answer}',null,null,null,'{$type}')";
	}else if($type == "2"){
		$sql="insert into question VALUES (null,'{$question}','{$A}','{$B}','{$C}','{$D}','{$answer}','{$music_url}',null,null,'{$type}')";
	}else if($type == "3"){
		$sql="insert into question VALUES (null,'{$question}','{$A}','{$B}','{$C}','{$D}','{$answer}',null,'{$video_url}',null,'{$type}')";
	}else if($type == "4"){
		$sql="insert into question VALUES (null,'{$question}','{$A}','{$B}','{$C}','{$D}','{$answer}',null,null,'{$pic_url}','{$type}')";
	}
		
 //   $sql="insert into notice VALUES (null,'{$question}','{$A}','{$B}','{$C}','{$D}','{$answer}','{$music_url}','{$video_url}','{$type}')";
	$res=mysqli_query($dbc,$sql);

    if($res==1)
    {

        echo "<script>alert('增加题目成功！')</script>";
        echo "<script>window.location.href='admin_question.php'</script>";

    }
    else
    {
        echo "<script>alert('增加题目失败！请重新输入！');</script>";

    }

}


?>
</body>
</html>
