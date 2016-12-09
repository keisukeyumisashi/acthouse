<?php
	require 'utils.php';
	$id = $_GET['id'];//idを取って

	$sql = "update posts set likes = likes + 1 where id = ${id}";//like機能準備
	get_db()->query($sql);//実行

	$url = "show.php?id=${id}";//リダイレクト(飛ばしてる)
	header("Location: ${url}");
	exit();


?>