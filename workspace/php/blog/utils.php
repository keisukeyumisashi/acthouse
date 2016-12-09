<?php
	function get_db() {//phpからデータベースにアクセスするためのオブジェクトを取ってくる
		$db = new PDO('mysql:host=localhost;dbname=blog_l;charset=utf8mb4','root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $db;
	}
	function get_post($id) {//idを渡してレコードを受け取る
		$sql = "select * from posts where id = '${id}'";
		$post = get_db()->query($sql)->fetch();
		return $post;
	}

	function get_limit() {
		return 5;
	}
	function get_posts($offset) {//offset.()件かとってくる
		$limit = get_limit();
		if ($offset < 0) {
			$offset = 0;
		}
		$sql = "select * from posts where status != 'draft' order by created_at desc limit ${limit} offset ${offset}";
		$stmt = get_db()->query($sql);
		return $stmt;
	}

	function get_all_posts() {
		$sql = "select * from posts order by created_at desc";
		return get_db()->query($sql);
	}

	function get_drafts($offset) {//記事を取得する.draftだけを取ってくる//下書き
		$limit = get_limit();
		$sql = "select * from posts where status = 'draft' order by created_at desc limit ${limit} offset ${offset}";
		return get_db()->query($sql);
	}

	function get_drafts_count() {//ドラフトを取得する
		$sql = "select count(*) as count from posts where status = 'draft'";
		$result = get_db()->query($sql)->fetch();
		return $result['count'];
	}

	function get_posts_count() {
		$sql = "select count(*) as count from posts where status != 'draft'";
		$result = get_db()->query($sql)->fetch();
		return $result['count'];
	}

	function link_tag($url, $label, $params) {//aタグの代わり
		$qs = "?";
		foreach ($params as $key => $param) {
			$qs = "${qs}${key}=${param}&";
		}
		$url = "${url}${qs}";
		$tag = "<a href='${url}'>${label}</a>";
		echo $tag;
	}

	function is_valid_image($image_path) {
		return (!empty($image_path) and file_exists($image_path) and !ends_with($image_path));
	}

	function ends_with($str) {//最後の文字を取ってくる
		$end = substr($str, strlen($str) - 1);//substrは指定した場所から文字数を抜きだす
		return $end == '/';
	}
?>