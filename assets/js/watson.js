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

	cardError($id) {
		var html = '<h1 class="card-error-title">Gravatar<span>.</span></h1><div class="card-error-icon"></div>';
		$('#'+$id).html(html);
	}

	cardEmpty($name) {
		var html = '<h1 class="empty-title">No results found<span>.</span></h1><div class="empty-icon"></div>';
		$('#'+$name).html(html);
		$('#'+$name).css('opacity', '0.7');
	}

	addImage($id, $path, $link) {
		var html = '<a class="card-image-wrapper" href="'+$link+'"><img class="card-image" src="'+$path+'"></a>';
		$('#'+$id).append(html);
	}

	addInfo($id, $title, $value) {
		if ($value != undefined) {
			var html = '<h2 class="card-info-title">'+$title+': <span class="card-info-value">'+$value+'</span></h2>';
			$('#'+$id).append(html);
		}
	}

	// Scans

	Pwn($email) {

	}

	Gravatar($email) {
		var email = $email;
		Watson.createCard('gravatar');
		$.ajax({
			url: 'feed/gravatar',
			type: 'POST',
			data: {'email': $email, 'token': '31a20a479ca838f9e4a67cc834360714'},
			success: function(data) {
				console.log(data);
				data = JSON.parse(data);
				switch (data.response) {
					case 'SUCCESS':
						var data = data['entry'][0];
						var profile = data.profileUrl;
						var username = data.preferredUsername;
						var display_name = data.displayName;
						var image = data.thumbnailUrl;
						var name = data.name.formatted;
						var about = data.aboutMe;
						Watson.stopLoading('gravatar');
						setTimeout(function() {
						Watson.addImage('gravatar', image, profile);
						Watson.addInfo('gravatar', 'Username', username);
						Watson.addInfo('gravatar', 'Display Name', display_name);
						Watson.addInfo('gravatar', 'Name', name);
						Watson.addInfo('gravatar', 'About', about);
						Watson.Pwn(email);
						}, 210);
						break;
					case 'NO_RESPONSE':
						Watson.cardEmpty('gravatar');
						Watson.Pwn(email);
						break;
					case 'INVALID_EMAIL':
						alert('Error: The email you entered was not a valid email');
						Watson.stopLoading('gravatar');
						Watson.cardError('gravatar');
						break;
					case 'NO_EMAIL':
						alert('Error: No email was supplied to the server, please reload and try again.');
						Watson.cardError('gravatar');
						break;
					case 'INVALID_OR_NO_TOKEN':
						alert('Error: No token was supplied to the server, please reload and try again.');
						Watson.cardError('gravatar');
						break;
					default: 
						alert('A major issue occurred, please reload the page and try again.');
						Watson.cardError('gravatar');
				} 
			}
		});
	}

}

// Gravatar
// Facebook
// HIBP
// Twitter