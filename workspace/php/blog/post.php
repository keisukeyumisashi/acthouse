<?php $page_title = "投稿されました"; ?>
<?php include "parts/header.php"; ?>
<?php
	$title = $_POST['title'];
	$content = $_POST['content'];
  $id = $_POST['id'];
	if (empty($id)) {
		//新規作成時処理
		$sql = "insert into posts (title, content) values (?, ?)";
		$success = get_db()->prepare($sql)->execute(array($title, $content));
		//画像変更時にidを使用するので最新のレコードのidを取得
		$sql = "select * from posts order by id desc limit 1";
		$post = get_db()->query($sql)->fetch();
		$id = $post['id'];
	} else {
		//編集時処理
		$sql = "update posts set title = ?, content = ? where id = ?";
		$params = array($title, $content, $id);
		$success = get_db()->prepare($sql)->execute($params);
		//編集時はidが$_POSTで送られてきているので$idをそのまま使う
	}

	$image = $_FILES['image'];
	if ($image['error'] == 0) {//画像編集時に画像を消さない
		$path = "uploads/${id}";
		@mkdir($path, 0777, true);
		$image_name = $image['name'];
		$image_type = $image['type'];
		$image_path = "${path}/${image_name}";
		move_uploaded_file($image['tmp_name'], $image_path);
		$sql = "update posts set image_path = ?, image_type = ? where id = ?";
		$params = array($image_path, $image_type, $id);
		$success = get_db()->prepare($sql)->execute($params);
	}
	if (isset($_POST['draft'])) {
		$sql = "update posts set status = 'draft' where id = ${id}";
		get_db()->query($sql);
		//下書き操作draftをつけた
	}
?>
	<p>投稿されました</p>
	<a href="index.php">TOPに戻る</a>
<?php include "parts/footer.php"; ?>