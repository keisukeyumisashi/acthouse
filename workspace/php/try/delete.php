<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
<?php
		$db = new PDO('mysql:host=localhost;dbname=acthouse;charset=utf8mb4','root', '');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$id = $_GET['id']; //idをとってきた		
		$sql = "delete from students where id = ?";
		$stmt = $db->prepare($sql);//prepareはただの準備
		$success = $stmt->execute(array($id));//executeは実行でarrayは配列idを
		header("Location: index.php");//これは
 				   exit();//これはブレーク
?>
	
</body>
</html>
<?php 


?>