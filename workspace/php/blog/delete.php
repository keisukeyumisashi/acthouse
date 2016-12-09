<?php $page_title = "削除しました"; ?>
<?php include "parts/header.php"; ?>
<?php
	$id = $_GET['id'];
	$sql = "delete from posts where id = ${id}";
	$success = get_db()->query($sql);
?>
<p>記事を削除しました</p>
<a href="index.php">TOPに戻る</a>	

<?php include "parts/footer.php"; ?>