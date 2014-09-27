$(document).ready(function () {

	$('#header-1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {

		$('#header-2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$('body').addClass('all-animations-done');
		});


		$('#header-2').addClass('animated bounceInLeft').show();
	})

	$('#header-2').hide();
	$('#header-1').addClass('animated bounceInLeft')
});