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

	function get_http_response_code($url) {
		$headers = get_headers($url);
		return substr($headers[0], 9, 3);
	}

?>