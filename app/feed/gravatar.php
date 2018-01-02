<?php 

	if (isset($_POST['token']) == '31a20a479ca838f9e4a67cc834360714') {
			if (isset($_POST['email'])) {
				$email = $_POST['email'];
				if (!!filter_var($email, FILTER_VALIDATE_EMAIL)) {

					$hash = md5($email);
					$url = 'https://www.gravatar.com/'.$hash.'.php';
					$json = file_get_contents($url);

					if ($json) {
						$data = unserialize($json);
						$response = array('response' => 'SUCCESS');
						$data = array_merge($response, $data);
						$data = json_encode($data);
						print_r($data);
					} else {
						$array = array('response'=>'NO_RESPONSE');
						$json = json_encode($array);
						echo $json;
					}

				} else {
					$error = array('response' => 'INVALID_EMAIL');
					echo json_encode($error);
				}
			} else {
				$error = array('response' => 'NO_EMAIL');
				echo json_encode($error);
			}
	} else {
		$error = array('response' => 'INVALID_OR_NO_TOKEN');
		echo json_encode($error);
	}

 ?>