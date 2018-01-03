<?php 


	if (isset($_POST['token']) == '31a20a479ca838f9e4a67cc834360714') {
			if (isset($_POST['email'])) {
				$email = $_POST['email'];
				if (!!filter_var($email, FILTER_VALIDATE_EMAIL)) {

					$url = 'https://haveibeenpwned.com/api/v2/breachedaccount/'.$email.'?includeUnverified=true';

					$options = array(
					  'http'=>array(
					    'method'=>"GET",
					    'header'=>"Accept-language: en\r\n" .
					              "Cookie: foo=bar\r\n" . 
					              "User-Agent: Watson App \r\n" 
					  )
					);

					$context = stream_context_create($options);
					$json = file_get_contents($url, false, $context);

					if ($json) {
						$data = json_decode($json);
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
