<?php $page_title = "画像一覧";
   include "parts/header.php" ?>

	<div class="container">
		<div class="row">
	   <?php foreach(get_all_posts() as $row) : ?>
	   	<?php if (is_valid_image($row['image_path'])) : ?>
		   	<div class="col-xs-2">
		   		<a href="show.php?id=<?php echo $row['id']; ?>" class="thumbnail">
		   			<img src="image.php?id=<?php echo $row['id']; ?>" alt="<?php echo $row['title']; ?>">
		   		</a>
				</div>
			<?php endif; ?>
	   <?php endforeach; ?>
	  </div>
  </div>
   <?php include "parts/footer.php"; ?>