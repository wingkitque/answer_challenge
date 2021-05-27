<?php
session_start();
$userid=$_SESSION['userid'];
include ('mysqli_connect.php');
$id=$_GET['id'];

$sqlb="select * from question where id='{$id}'";
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
    <title>答题小程序 || 公告信息修改</title>
</head>
<body>
<h1 style="text-align: center"><strong>题目修改</strong></h1><br/><br/><br/>
<div style="padding: 10px 500px 10px;">
    <form  action="admin_question_edit.php?id=<?php echo $id; ?>" method="POST" style="text-align: center" class="bs-example bs-example-form" role="form">
        <div id="login">
            <div class="input-group"><span class="input-group-addon">问题</span><input name="question" type="text" placeholder="请输入问题" value="<?php echo $resultb['question'] ;?>" class="form-control"></div><br/>
			
			<div class="input-group"><span class="input-group-addon">题目类型</span>
			<select class="form-control" name="type" id="type" selected="<?php echo $resultb['type'] ;?>">
			<option selected="selected" value="<?php echo $resultb['type'] ;?>"><?php if($resultb['type'] == '1') echo'文字题';else if($resultb['type'] == '2') echo'音频题';else if($resultb['type'] == '3') echo '视频题';else if($resultb['type'] == '4') echo '图片题';?></option>
			<option value="1">文字题</option>
			<option value="2">音频题</option>
			<option value="3">视频题</option>
			<option value="4">图片题</option>
		</select>
</div></br>
			<div class="input-group"><span class="input-group-addon">选项A</span><input name="A" type="text" placeholder="请输入选项A" value="<?php echo $resultb['A'] ;?>" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">选项B</span><input name="B" type="text" placeholder="请输入选项B" value="<?php echo $resultb['B'] ;?>" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">选项C</span><input name="C" type="text" placeholder="请输入选项C" value="<?php echo $resultb['C'] ;?>" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">选项D</span><input name="D" type="text" placeholder="请输入选项D" value="<?php echo $resultb['D'] ;?>" class="form-control"></div><br/>
            <div class="input-group"><span class="input-group-addon">答案</span><input name="answer" type="text" placeholder="请输入答案" value="<?php echo $resultb['answer'] ;?>" class="form-control"></div><br/>
			<div class="input-group"><span class="input-group-addon">音频路径</span><input name="music_url" type="text" placeholder="请输入音频路径" value="<?php echo $resultb['music_url'] ;?>" class="form-control"></div><br/>
			<div class="input-group"><span class="input-group-addon">视频路径</span><input name="video_url" type="text" placeholder="请输入视频路径" value="<?php echo $resultb['video_url'] ;?>" class="form-control"></div><br/>
			<div class="input-group"><span class="input-group-addon">图片路径</span><input name="pic_url" type="text" placeholder="请输入图片路径" value="<?php echo $resultb['pic_url'] ;?>" class="form-control"></div><br/>
            <input type="submit" value="确认修改" class="btn btn-default">
            <input type="reset" value="重置" class="btn btn-default">
        </div>
    </form>
</div>

<?php

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

	if($type == '1'){
		 $sql="update question set question='{$question}',type='{$type}',A='{$A}',
B='{$B}',C='{$C}',D='{$D}',answer='{$answer}',music_url=null,video_url=null,pic_url=null where id='{$id}';";
	}else if($type == '2'){
		 $sql="update question set question='{$question}',type='{$type}',A='{$A}',
B='{$B}',C='{$C}',D='{$D}',answer='{$answer}',music_url='{$music_url}',video_url=null,pic_url=null where id='{$id}';";
	}else if($type == '3'){
		 $sql="update question set question='{$question}',type='{$type}',A='{$A}',
B='{$B}',C='{$C}',D='{$D}',answer='{$answer}',music_url=null,video_url='{$video_url}',pic_url=null where id='{$id}';";
	}else if($type == '4'){
    $sql="update question set question='{$question}',type='{$type}',A='{$A}',
B='{$B}',C='{$C}',D='{$D}',answer='{$answer}',music_url=null,video_url=null,pic_url='{$pic_url}' where id='{$id}';";
	}
    $res=mysqli_query($dbc,$sql);
	
    if($res==1)
    {

        echo "<script>alert('修改成功！')</script>";
        echo "<script>window.location.href='admin_question.php'</script>";

    }
    else
    {
        echo "<script>alert('修改失败！请重新输入！');</script>";

    }

}


?>
</body>
</html>
