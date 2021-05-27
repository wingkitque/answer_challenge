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
    <title>答题小程序 || 账户密码修改</title>
	<style>
	body{
            width: 100%;
            overflow: hidden;
            background: url("bg_password.jpg") no-repeat;
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
				<li><a href="admin_parameter.php">参数设置</a></li>
				<li><a href="admin_feedback.php">意见反馈</a></li>
				<li  class="active"><a href="admin_password.php">修改密码</a></li>
                <li><a href="index.php">退出</a></li>
            </ul>
        </div>
    </div>
</nav>
<h1 style="text-align: center"><strong>密码修改</strong></h1><br/><br/><br/>
<div style="padding: 10px 500px 10px;">
    <form  action="admin_password.php" method="POST" style="text-align: center" class="bs-example bs-example-form" role="form">
        <div id="login">
            <div class="input-group"><span class="input-group-addon">原密码</span><input name="password" type="text" placeholder="请输入原密码" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">新密码</span><input name="pass1" type="text" placeholder="请输入新密码" class="form-control"></div><br/>
			<div class="input-group"><span class="input-group-addon">确认新密码</span><input name="pass2" type="text" placeholder="请确认新密码" class="form-control"></div><br/>
            <input type="submit" value="确认修改" class="btn btn-default">
            <input type="reset" value="重置" class="btn btn-default">
        </div>
    </form>
</div>

<?php
 error_reporting(0); 
if ($_SERVER["REQUEST_METHOD"] == "POST")
{

    $password= $_POST["password"];
	$pass1= $_POST["pass1"];
    $pass2 = $_POST["pass2"];

	if($pass1 == $pass2){
		$sql1 ="select * from admin where admin_id = '{$userid}'";
		$resb=mysqli_query($dbc,$sql1);
		$resultb=mysqli_fetch_array($resb);
    if($resb == 1)
    {
		if($resultb['password'] == $password)
		{
			$sql="update admin set password = '{$pass1}' where admin_id = '{$userid}'";
			$res=mysqli_query($dbc,$sql);
			if($res==1)
			{
				echo "<script>alert('修改成功！')</script>";
				echo "<script>window.location.href='admin_password.php'</script>";
			}
			else
			{
			echo "<script>alert('修改失败！请重新输入！');</script>";
			}
		}
		else
		{
			echo "<script>alert('原密码错误！请重新输入！');</script>";
		}
	}
    else
    {
        echo "<script>alert('修改失败！请重新输入！');</script>";

    }
	}
	else
	{
    echo "<script>alert('两个新密码不相同！请重新输入！');</script>";
	}


}


?>
</body>
</html>
