<?php 

	if (isset($_POST['token']) == '31a20a479ca838f9e4a67cc834360714') {
			if (isset($_POST['email'])) {
				$email = $_POST['email'];
				if (!!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	
					$url = 'https://api.flickr.com/services/rest/?method=flickr.people.findByEmail&api_key=6966a9b6f56c25b0acd73ef130f13c2f&find_email='.$email.'&format=json&nojsoncallback=1';
					$json = file_get_contents($url);
					$parse = json_decode($json, true);

					if ($parse['stat'] == 'ok') {
						$id = $parse['user']['nsid'];
						$url_2 = 'https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=6966a9b6f56c25b0acd73ef130f13c2f&user_id='.$id.'&format=json&nojsoncallback=1';
						$json = file_get_contents($url_2);
						$parse = json_decode($json, true);

						$server = $parse['person']['iconserver'];
						$farm = $parse['person']['iconfarm'];
						$username = $parse['person']['username']['_content'];
						$link = $parse['person']['profileurl']['_content'];
						$photos = $parse['person']['photos']['count']['_content'];

						if ($server != 0) {
							$image = 'http://farm'.$farm.'.staticflickr.com/'.$server.'/buddyicons/'.$id.'.jpg';
						} else {
							$image = 'http://www.flickr.com/images/buddyicon.gif';
						}

						$account = array();
						$account['response'] = 'SUCCESS';
						$account['username'] = $username;
						$account['profile'] = $link;
						$account['image'] = $image;
						$account['photos'] = $photos;

						echo json_encode($account);

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