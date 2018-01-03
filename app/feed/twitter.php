<?php 

	if (isset($_POST['token']) == '31a20a479ca838f9e4a67cc834360714') {
			if (isset($_POST['email'])) {
				$email = $_POST['email'];
				if (!!filter_var($email, FILTER_VALIDATE_EMAIL)) {

					include('app/vendor/Scraper.php');

					$search = strtok($email, '@');
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_URL, "https://twitter.com/search?f=users&q=".$search);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
					curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');
					$headers = array();
					$headers[] = "Accept-Encoding: gzip, deflate, br";
					$headers[] = "Accept-Language: en-US,en;q=0.9,de;q=0.8,fr;q=0.7,nb;q=0.6,la;q=0.5";
					$headers[] = "Upgrade-Insecure-Requests: 1";
					$headers[] = "Cache-Control: max-age=0";
					$headers[] = "Authority: twitter.com";
					curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
					$result = curl_exec($ch);
					curl_close ($ch);
					
					$html = str_get_html($result);
					$check = $html->find('div.ProfileCard', 0)->plaintext;
					
					if ($check != '') {
						$cards = $html->find('div.ProfileCard');
						$accounts = array();
						$accounts['response'] = 'SUCCESS';
						foreach ($cards as $card) {
							$account = array();
							$image = $card->find('div.ProfileCard-content', 0)->children(0)->children(0)->getAttribute('src');
							$name = $card->find('div.ProfileCard-content', 0)->children(2)->children(0)->children(0)->children(0)->plaintext;
							$username = $card->getAttribute('data-screen-name');
							$account['image'] = $image;
							$account['name'] = $name;
							$account['username'] = $username;
							array_push($accounts, $account);
						}
				        echo json_encode($accounts);
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