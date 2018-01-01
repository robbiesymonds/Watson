<?php

	function route($url) {
		return $url;
	}

	function layout($page) {
		$path = 'views/'.$page.'.html';
		include($path);
	}

	function feed($page) {
		$path = 'app/feed/'.$page.'.php';
		include($path);
	}

?>