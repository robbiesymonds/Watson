<?php 

	// if (isset($_POST['token']) == '31a20a479ca838f9e4a67cc834360714') {
	// 		if (isset($_POST['email'])) {
	// 			$email = $_POST['email'];
	// 			if (!!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				
					$email = 'robbiesymonds26@gmail.com';
					$hash = md5($email);
					$url = 'https://gravatar.com/'.$hash.'.json';

					$json = file_get_contents($url);
					


	// 			} else {
	// 				$error = array('response' => 'INVALID_EMAIL');
	// 				echo json_encode($error);
	// 			}
	// 		} else {
	// 			$error = array('response' => 'NO_EMAIL');
	// 			echo json_encode($error);
	// 		}
	// } else {
	// 	$error = array('response' => 'INVALID_OR_NO_TOKEN');
	// 	echo json_encode($error);
	// }

 ?>