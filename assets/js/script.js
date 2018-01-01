// Functions
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// Variables
$email = '';
$kill = false;
let Watson = new WatsonHandler;

$(document).ready( function() {
	if (location.href !== "http://localhost:8888/") {
		$('.logo').addClass('clickable');
	}

	$('.logo > h1').click(function() {
		if (location.href !== "http://localhost:8888/") {
			window.location.href = "/";
		}
	});

	$('body').scroll( function() {
		if ($('body').scrollTop() > 10) {
			$('.logo').css('box-shadow', '2px 0px 3px 2px rgba(0,0,0,0.3)');
		} else {
			$('.logo').removeAttr('style');
		}
	});	

	$('#email').on('input', function() {
		if (isEmail($.trim($('#email').val()))) {
			$(this).css('border-color', '#00E676');
			$('.button-line').css('background-color', '#00E676');
			$('.button').addClass('active-button');
		} else {
			$(this).css('border-color', 'lightgrey');
			$('.button-line').css('background-color', 'lightgrey');
			$('.button').removeClass('active-button');
		}
	});

	$('.button').on('click', function() {
		if ($(this).hasClass('active-button')) {
			if (isEmail($.trim($('#email').val()))) {
				$('.button').addClass('button-hide');
				setTimeout(function() {
					$('button').hide();
					$('.button-line').addClass('line-hide');
					setTimeout(function() {
						$('.button-line').hide();
					}, 110);
				}, 90);
				setTimeout(function() {
					$('#email').addClass('text-mode');
					$('#email').attr('readonly', 'true');
				}, 500);
				$('.corner-loader').fadeIn(200);
				setTimeout(function() {
					Watson.Start();
				}, 700);
			}
		}
	});

	$('.corner-loader').click(function() {
		$('.stop-warning').fadeIn(100);
		$('.stop-warning-box').slideDown(100);
	});

	$('.stop-button').click(function() {
		if ($(this).attr('data-boolean') == 'false') {
			$('.stop-warning').fadeOut(100);
			$('.stop-warning-box').slideUp(100);
		} else {
			// Kill Current Processes
			Watson.Kill();
			$('.stop-warning').fadeOut(100);
			$('.stop-warning-box').slideUp(100);
			$('.corner-loader').fadeOut(200);
		}
	});
});