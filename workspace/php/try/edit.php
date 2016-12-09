<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
<?php
			$db = new PDO('mysql:host=localhost;dbname=acthouse;charset=utf8mb4','root', '');
 			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

 			if (isset($_POST['id'])) {
 				$sql = "update students set name = ?, gender = ?,
 				   age = ? where id = ?";
 				   $id = $_POST['id'];
 				   $name = $_POST['name'];
 				   $gender = $_POST['gender'];
 				   $age = $_POST['age'];
 				   $stmt = $db->prepare($sql);
 				   $success = $stmt->execute(array($name, $gender, $age, $id));
 				   header("Location: index.php");
 				   exit();
 			}

 			$id = $_GET['id'];
 			$sql = "select * from students where id = ${id}";
 			$student = $db -> query($sql) -> fetch();
 ?>

 <form action="" method="post">
  <input type="text" name="name" value="<?php echo $student['name']; ?>">
  <input type="text" name="gender" value="<?php echo $student['gender']; ?>">
  <input type="text" name="age" value="<?php echo $student['age']; ?>">
  <input type="hidden" name="id" value="<?php echo $student['id']; ?>">
  <button>変更</button>
 </form>



	
</body>
</html>