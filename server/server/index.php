<?php
session_start();
if(isset($_SESSION['userid']))
{
    unset($_SESSION['userid']);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>答题小程序 || 请登陆</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <style>

        body{
            width: 100%;
            overflow: hidden;
            background: url("bg_index.jpg") no-repeat;
            background-size:cover;
            color: antiquewhite;
        }
    </style>

</head>
<body>
<h1 style="text-align: center"><strong>答题小程序登陆</strong></h1>
<div style="padding: 180px 550px 10px;text-align: center">
    <form  action="login_check.php" method="POST" class="bs-example bs-example-form" role="form">
        <div id="login">
            <div class="input-group"><span class="input-group-addon">账户</span><input  name="account" type="text" placeholder="请输入账号" class="form-control"></div><br><br>
            <div class="input-group"><span class="input-group-addon">密码</span><input  name="pass" type="password" placeholder="请输入密码" class="form-control"></div><br><br><br>
            <input type="submit" value="登陆" class="btn btn-default">
            <input type="reset" value="重置" class="btn btn-default">
        </div>
    </form>
</div>
</body>
</html>