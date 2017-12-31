<?php 

	namespace Eliforp;

	include 'app/vendor/Router.php';
	$request = $_SERVER['REQUEST_URI'];
	$url = new Router($request);

	$url->get('/', 'views/search.html');

 ?>