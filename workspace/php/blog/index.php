<?php $page_title = "ブログ"; ?>
<?php include "parts/header.php"; ?>
	<div class="header">
		 	<div class="header-left">ブロぐタイトル</div>
		 	<div class="header-right">
		 		<ul>
			 		<li><a href="index.php">トップ</a></li>
			 		<li><a href="explain.php">このサイトについて</a></li>
			 		<li>サイトマップ</li>
		 		</ul>
	 		</div>
	</div>
	<div class="main">
		<div class="sidebar">
			<ul>
		  		<li><a href="pictures.php">写真</a></li>
		  		<li>カテゴリ2</li>
		  		<li>カテゴリ3</li>
		  		<li>カテゴリ4</li>
	  		</ul>
	  		<img src="">
		</div>
		<div class="contents">
			  <?php
			  		if (!isset($_GET['o']) or empty($_GET['o']) or $_GET['o'] < 0) {
			  			$offset = 0;
			  		} else {
			  			$offset = $_GET['o'];
			  		}
			  		if (isset($_GET['draft'])) {
			  			$posts = get_drafts($offset);
			  			$count= get_drafts_count();
			  			$params = ["draft" => ""];
			  		} else {
			  			$posts = get_posts($offset);
			  			$count = get_posts_count();
			  			$params = [];

			  		}
			  ?>
			 <div class="conteiner">
			 		<button><a href="new.php">新規投稿</a></button>
			 		<button><a href="index.php?draft">下書き一覧</a></button>

			 		<?php
			 			$limit = get_limit();
			 			$prev_offset = $offset - $limit;
			 			$next_offset = $offset + $limit;
			 		?>

					<nav aria-label="Page navigation">
			 			<ul class="pagination">
			 				<li>
						 		<?php if ($prev_offset >= 0) :

						 				$params["o"] = $prev_offset;
						 				link_tag("index.php", "前へ", $params);
										endif;
								?>
							</li>

							<li>
								<?php
									for($i =0; $i < $count; $i++) {//countの数だけとってきている
										if ($i % $limit == 0) {
											$page = $i / $limit;
											$page_offset = $page * $limit;
											$params["o"] = $page_offset;
											link_tag("index.php", $page + 1, $params);
										}//記事の12345の奴
									}
								?>
							</li>

							<li>
								<?php if ($next_offset < $count) : ?>
									<?php
										$params["o"] = $next_offset;
										link_tag("index.php", "次へ", $params);
							 			endif;
						 		?>
						 	</li>
						</ul>
					</nav>
					<div style="border: solid black;">
						<h2>最新</h2>
						<?php $main = $posts->fetch(); ?>
						<a href="show.php?id=<?php echo $main['id']; ?>">
							<p><?php echo $main['created_at']; ?></p>
							<div>
					   		<img src="image.php?id=<?php echo $main['id']; ?>" alt="<?php echo $main['title']; ?>" class="image">
					   		<p><?php echo $main['content']; ?></p>
					   	</div>
							<h3><?php echo $main['title']; ?></h3>
						</a>
					</div>

			   	<?php foreach($posts as $row) : ?>
			   	<article style="border: solid black;">
			   		<?php       //上は取ってきたpostsを一つずつ処理する
							$likes = $row['likes'];
							if ($likes == 0) : ?>
								<p>いいね!はまだありません</p>
							<?php else : ?>
								<p><?php echo $row['likes']; ?>回いいね!されています</p>
							<?php endif; ?>

			   		<a href="show.php?id=<?php echo $row['id']; ?>">
				   	<div>投稿日時:<?php echo $row['created_at']; ?></div>
				   	<div>
				   		<img src="image.php?id=<?php echo $row['id']; ?>" alt="<?php echo $row['title']; ?>" class="image">
				   	</div>
				   	<div><?php echo $row['title']; ?></div>
				   	<?php
				   		$content = $row['content'];//記事の内容
				   		if (mb_strlen($content) >= 20) {//20文字以上ならのif分
				   			$content = mb_substr($content, 0, 20);//mb_substrとは半角全角統一してるマルチバイト.50文字まで
				   			$content .= '...';//この.は+=とかと一緒で最後に...
				   			}
				   	?>
				   	<div><?php echo $content; ?></div>
				   	<hr>
				   	</a>
			   	</article>

			   <?php endforeach; ?>
			 </div>
		</div>
	</div>
	<div class="footer"></div>
<?php include "parts/footer.php"; ?>

