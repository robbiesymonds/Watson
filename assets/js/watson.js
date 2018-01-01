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

	createCard($name) {
		var id = $name;
		var name = $name.charAt(0).toUpperCase() + $name.slice(1);
		var html = '<div id="'+id+'" class="card"><div class="card-title">'+name+'<span>.</span></div><div class="card-loader"></div></div>';
		$('.cards').append(html);
		setTimeout(function() {
			$('#'+id).addClass('card-shown');
		}, 100);
	}

	stopLoading($id) {
		$('#'+$id+ ' > .card-loader').fadeOut(200);
	}

	// Scans

	Gravatar($email) {
		Watson.createCard('gravatar');
		$.ajax({
			url: 'feed/gravatar',
			type: 'POST',
			data: {'email': $email, 'token': '31a20a479ca838f9e4a67cc834360714'},
			success: function(data) {
				data = JSON.parse(data);
				var data = data['entry'][0];
				var profile = data.profileUrl;
				var username = data.preferredUsername;
				var display_name = data.displayName;
				var image = data.thumbnailUrl;
				var name = data.name.formatted;
				var about = data.aboutMe;
				Watson.stopLoading('gravatar');
			}
		});
	}

}

// Gravatar
// Facebook
// HIBP
// Twitter