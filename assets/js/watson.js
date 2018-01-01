// function WatsonStart() {

// 	Watson->gravatar()

// }

class WatsonHandler {

	// Core Functions

	Kill() {
		$kill = true;
	}

	Ready() {
		if ($kill == false) {
			return true;
		} else {
			return false;
		}
	}

	Start() {
		if (Watson.Ready()) {
			$email = $.trim($('#email').val());
			Watson.Gravatar($email);
		}
	}

	// Scans

	Gravatar($email) {
		$.ajax({
			url: 'feed/gravatar',
			type: 'POST',
			data: {'email': $email, 'token': '31a20a479ca838f9e4a67cc834360714'},
			success: function(data) {
				console.log(data);
			}
		});
	}

}

// Gravatar
// Facebook
// HIBP
// Twitter