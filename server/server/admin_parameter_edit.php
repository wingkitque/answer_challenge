<?php
session_start();
$userid=$_SESSION['userid'];
include ('mysqli_connect.php');
$id=$_GET['id'];

$sqlb="select * from parameter where id='{$id}'";
$resb=mysqli_query($dbc,$sqlb);
$resultb=mysqli_fetch_array($resb);
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
    <title>答题小程序 || 参数信息修改</title>
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
<h1 style="text-align: center"><strong>参数修改</strong></h1><br/><br/><br/>
<div style="padding: 10px 500px 10px;">
    <form  action="admin_parameter_edit.php?id=<?php echo $id; ?>" method="POST" style="text-align: center" class="bs-example bs-example-form" role="form">
        <div id="login">
			<div class="input-group"><span class="input-group-addon">答题状态</span>
			<select class="form-control" name="status" id="status" selected="<?php echo $resultb['status'] ;?>">
			<option selected="selected" value="<?php echo $resultb['status'] ;?>"><?php if($resultb['status'] == '0') echo'正在答题';else if($resultb['status'] == '1') echo'尚未开始';else if($resultb['status'] == '2') echo '答题结束';?></option>
			<option value="1">尚未开始</option>
			<option value="0">正在答题</option>
			<option value="2">答题结束</option>
		</select>
</div></br>
			<div class="input-group"><span class="input-group-addon">题目数量</span><input name="question_num" type="text" placeholder="请输入题目数量" value="<?php echo $resultb['question_num'] ;?>" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">答题时间</span><input name="time_use" type="text" placeholder="请输入答题时间" value="<?php echo $resultb['time_use'] ;?>" class="form-control"></div><br/>
            <input type="submit" value="确认修改" class="btn btn-default">
            <input type="reset" value="重置" class="btn btn-default">
        </div>
    </form>
</div>

<?php

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	$status= $_POST["status"];
    $question_num = $_POST["question_num"];
    $time_use= $_POST["time_use"];
	
		 $sql="update parameter set status='{$status}',question_num='{$question_num}',time_use='{$time_use}';";
    $res=mysqli_query($dbc,$sql);
    if($res==1)
    {

        echo "<script>alert('修改成功！')</script>";
        echo "<script>window.location.href='admin_parameter.php'</script>";

    }
    else
    {
        echo "<script>alert('修改失败！请重新输入！');</script>";

    }

}


?>
</body>
</html>
