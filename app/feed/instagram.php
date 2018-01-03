<?php 

	if (isset($_POST['token']) == '31a20a479ca838f9e4a67cc834360714') {
			if (isset($_POST['email'])) {
				$email = $_POST['email'];
				if (!!filter_var($email, FILTER_VALIDATE_EMAIL)) {

					include('app/vendor/Scraper.php');
					$search = strtok($email, '@');
					$url = 'https://www.instagram.com/web/search/topsearch/?query='.$search;

					$ch = curl_init();

					curl_setopt($ch, CURLOPT_URL, $url);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
					curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');

					$headers = array();
					$headers[] = "Accept-Encoding: gzip, deflate, br";
					$headers[] = "Accept-Language: en-US,en;q=0.9,de;q=0.8,fr;q=0.7,nb;q=0.6,la;q=0.5";
					$headers[] = "Upgrade-Insecure-Requests: 1";
					$headers[] = "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36";
					$headers[] = "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8";
					$headers[] = "Cache-Control: max-age=0";
					$headers[] = "Authority: www.instagram.com";
					curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

					$result = curl_exec($ch);
					curl_close ($ch);
					$data = json_decode($result, true);

					if ($data['users'][0]) {
						$accounts = array();
						$accounts['response'] = 'SUCCESS';
						foreach ($data['users'] as $user) {
							$account = array();
							$username = $user['user']['username'];
							$image = $user['user']['profile_pic_url'];
							$account['username'] = $username;
							$account['image'] = $image;
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