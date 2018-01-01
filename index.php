<?php 

	require 'app/vendor/Router.php';
	$i = $_SERVER['REQUEST_URI'];

	if (route($i) == '/') {
		layout('search');
	} elseif (route($i) == '/terms') {
		layout('terms');
	} else {
		layout('errors/404');
	}


 ?>