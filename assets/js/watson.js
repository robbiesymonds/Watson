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

	Status($id, $type) {
		switch ($type) {
			case 'good':
				var html = '<div class="status-bubble good"></div><div class="card-status"><div class="status-tip">No issues occurred<span>.</span></div></div>';
				$('#'+$id).prepend(html);
				break;
			case 'external':
				var html = '<div class="status-bubble external"></div><div class="card-status"><div class="status-tip">Watson cannot display the results as this website prevents data from being shown<span>.</span></div></div>';
				$('#'+$id).prepend(html);
				break;
			case 'guess':
				var html = '<div class="status-bubble guess"></div><div class="card-status"><div class="status-tip">Watson has tried to guess the accounts linked to the email you searched<span>.</span></div></div>';
				$('#'+$id).prepend(html);
				break;
		}
	}

	createCard($name) {
		if (Watson.Ready()) {
			var id = $name;
			var name = $name.charAt(0).toUpperCase() + $name.slice(1);
			var html = '<div id="'+id+'" class="card"><div class="card-title">'+name+'<span>.</span></div><div class="card-loader"></div></div>';
			$('.cards').append(html);
			setTimeout(function() {
				$('#'+id).addClass('card-shown');
			}, 100);
		}
	}

	stopLoading($id) {
		$('#'+$id+ ' > .card-loader').fadeOut(200);
	}

	cardError($id) {
		var name = $id.charAt(0).toUpperCase() + $id.slice(1);
		var html = '<h1 class="card-error-title">'+name+'<span>.</span></h1><div class="card-error-icon"></div>';
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

	External($id, $link) {
		Watson.Status($id, 'external');
		var html = '<div class="external-text">Possible results<span>.</span></div><a target="_blank" href="'+$link+'" class="external-button">Click here</a>';
		$('#'+$id).append(html);
	}

	// Scans

	Breaches($email) {
		var email = $email;
		Watson.createCard('breaches');
		$.ajax({
			url: 'feed/breaches',
			type: 'POST',
			data: {'email': $email, 'token': '31a20a479ca838f9e4a67cc834360714'},
			success: function(data) {
				data = JSON.parse(data);
				switch (data.response) {
					case 'SUCCESS':
						Watson.stopLoading('breaches');
						Watson.Status('breaches', 'good');
						setTimeout(function() {
							var html = '';
							var html_start = '<div class="card-list">';
							var html_end = '</div>';
							$.each(data, function(i, item) {
								if (i != 'response') {
									var title = item.Title;
									var date = item.BreachDate;
									var description = item.Description;
									var info = item.DataClasses;
									var info_list = '';
									$.each(info, function(i, item) {
										info_list = info_list + ', ' + item;
									});
									info_list = info_list.substring(2);
									html = html + '<div class="card-list-item"><h1 class="list-title">'+title+'</h1><div class="list-expand"></div><div class="list-details"><h2 class="list-detail-big">Description: <span>'+description+'</span></h2><h2 class="list-detail">Breach Date: <span>'+date+'</span></h2><h2 class="list-detail">Leaked Data: <span>'+info_list+'</span></h2></div></div>';
								}
							});
							$('#breaches').append(html_start + html + html_end);
							if (Watson.Ready()) {
								Watson.Facebook(email);
							}
						}, 210);
						break;
					case 'NO_RESPONSE':
						Watson.cardEmpty('breaches');
						if (Watson.Ready()) {
							Watson.Facebook(email);
						}
						break;
					case 'INVALID_EMAIL':
						alert('Error: The email you entered was not a valid email');
						Watson.cardError('breaches');
						break;
					case 'NO_EMAIL':
						alert('Error: No email was supplied to the server, please reload and try again.');
						Watson.cardError('breaches');
						break;
					case 'INVALID_OR_NO_TOKEN':
						alert('Error: No token was supplied to the server, please reload and try again.');
						Watson.cardError('breaches');
						break;
					default: 
						alert('A major issue occurred, please reload the page and try again.');
						Watson.cardError('breaches');
				} 
			}
		});
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
						if (data.name) {
							var name = data.name.formatted;
						}
						var name = undefined;
						var about = data.aboutMe;
						Watson.stopLoading('gravatar');
						Watson.Status('gravatar', 'good');
						setTimeout(function() {
						Watson.addImage('gravatar', image, profile);
						Watson.addInfo('gravatar', 'Username', username);
						Watson.addInfo('gravatar', 'Display Name', display_name);
						Watson.addInfo('gravatar', 'Name', name);
						Watson.addInfo('gravatar', 'About', about);
						if (Watson.Ready()) {
							Watson.Breaches(email);
						}
						}, 210);
						break;
					case 'NO_RESPONSE':
						Watson.cardEmpty('gravatar');
						if (Watson.Ready()) {
							Watson.Breaches(email);
						}
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

	Facebook($email) {
		var email = $email;
		Watson.createCard('facebook');
		var link = 'https://www.facebook.com/search/results.php?q='+email;
		setTimeout(function() {
			Watson.stopLoading('facebook');
			setTimeout(function() {
				Watson.External('facebook', link);
				if (Watson.Ready()) {
					Watson.Twitter(email);
				}
			}, 220);
		}, 500);
	}

	Twitter($email) {
		var email = $email;
		Watson.createCard('twitter');
		$.ajax({
			url: 'feed/twitter',
			type: 'POST',
			data: {'email': $email, 'token': '31a20a479ca838f9e4a67cc834360714'},
			success: function(data) {
				data = JSON.parse(data);
				console.log(data);
				switch (data.response) {
					case 'SUCCESS':
						Watson.stopLoading('twitter');
						Watson.Status('twitter', 'guess');
						var html_start = '<div class="card-list">';
						var html_end = '</div>';
						var html = '';
						$.each(data, function(i, item) {
							if (i != 'response') {
								html = html + '<div class="list-link-item"><img src="'+item.image+'" class="list-link-profile"><h2 class="list-link-title">@'+item.username+'</h2><a target="_blank" href="https://twitter.com/'+item.username+'"><div class="list-link-icon"></div></a></div>';
							}
						});
						setTimeout(function() {
							$('#twitter').append(html_start + html + html_end);
						}, 210);
						if (Watson.Ready()) {
							Watson.LinkedIn(email);
						}
						break;
					case 'NO_RESPONSE':
						Watson.cardEmpty('twitter');
						if (Watson.Ready()) {
							Watson.LinkedIn(email);
						}
						break;
					case 'INVALID_EMAIL':
						alert('Error: The email you entered was not a valid email');
						Watson.cardError('twitter');
						break;
					case 'NO_EMAIL':
						alert('Error: No email was supplied to the server, please reload and try again.');
						Watson.cardError('twitter');
						break;
					case 'INVALID_OR_NO_TOKEN':
						alert('Error: No token was supplied to the server, please reload and try again.');
						Watson.cardError('twitter');
						break;
					default: 
						alert('A major issue occurred, please reload the page and try again.');
						Watson.cardError('twitter');
				} 
			}
		});
	}

	LinkedIn($email) {
		var email = $email;
		var email_part = email.split('@')[0];
		Watson.createCard('linkedin');
		var link = 'https://www.linkedin.com/search/results/index/?keywords='+email_part+'&origin=GLOBAL_SEARCH_HEADER';
		setTimeout(function() {
			Watson.stopLoading('linkedin');
			setTimeout(function() {
				Watson.External('linkedin', link);
				if (Watson.Ready()) {
					Watson.Instagram(email);
				}
			}, 220);
		}, 500);
	}

	Instagram($email) {
		var email = $email;
		Watson.createCard('instagram');
		$.ajax({
			url: 'feed/instagram',
			type: 'POST',
			data: {'email': $email, 'token': '31a20a479ca838f9e4a67cc834360714'},
			success: function(data) {
				data = JSON.parse(data);
				console.log(data);
				switch (data.response) {
					case 'SUCCESS':
						Watson.stopLoading('instagram');
						Watson.Status('instagram', 'guess');
						var html_start = '<div class="card-list">';
						var html_end = '</div>';
						var html = '';
						$.each(data, function(i, item) {
							if (i != 'response') {
								html = html + '<div class="list-link-item"><img src="'+data[i].image+'" class="list-link-profile"><h2 class="list-link-title">@'+data[i].username+'</h2><a target="_blank" href="https://instagram.com/'+item.username+'"><div class="list-link-icon"></div></a></div>';
							}
						});
						setTimeout(function() {
							$('#instagram').append(html_start + html + html_end);
						}, 210);
						if (Watson.Ready()) {
							// Watson.LinkedIn(email);
						}
						break;
					case 'NO_RESPONSE':
						Watson.cardEmpty('instagram');
						if (Watson.Ready()) {
							// Watson.LinkedIn(email);
						}
						break;
					case 'INVALID_EMAIL':
						alert('Error: The email you entered was not a valid email');
						Watson.cardError('instagram');
						break;
					case 'NO_EMAIL':
						alert('Error: No email was supplied to the server, please reload and try again.');
						Watson.cardError('instagram');
						break;
					case 'INVALID_OR_NO_TOKEN':
						alert('Error: No token was supplied to the server, please reload and try again.');
						Watson.cardError('instagram');
						break;
					default: 
						alert('A major issue occurred, please reload the page and try again.');
						Watson.cardError('instagram');
				} 
			}
		});
	}

}