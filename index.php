<?php 

	require 'app/vendor/Router.php';
	$i = $_SERVER['REQUEST_URI'];

	if (route($i) == '/') {
		layout('search');
	} elseif (route($i) == '/terms') {
		layout('terms');
	} elseif (route($i) == '/feed/gravatar') {
		feed('gravatar');
	} else {
		layout('errors/404');
	}


 ?>