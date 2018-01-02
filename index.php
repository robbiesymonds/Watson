<?php 

	require 'app/vendor/Router.php';
	$i = $_SERVER['REQUEST_URI'];

	switch(route($i)) {
		case '/':
			layout('search');
			break;
		case '/terms':
			layout('terms');
			break;
		case '/feed/gravatar':
			feed('gravatar');
			break;
		case '/feed/breaches':
			feed('breaches');
			break;
		default:
		layout('errors/404');
	}


 ?>