<?php
	require 'utils.php';
	$id = $_GET['id'];
	$post = get_post($id);

	$image_path = $post['image_path'];

	if (!is_valid_image($image_path)){
		//$image_pathが空または
		//$image_pathに指定したファイルが存在しない場合
		$image_path = "images/noimage.jpg";
		$image_type = "image/jpg";
	} else {
		//ファイルが存在する場合
		$image_type = $post['image_type'];
	}

	$file_size = filesize($image_path);
	header("Content-Length: ${file_size}");
	header("Content-Type: ${image_type}");
	echo file_get_contents($image_path);


?>