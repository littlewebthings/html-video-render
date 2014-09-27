var casper = require('casper').create();

var page = 'http://localhost:8889/test-pages/text-animation/index.html';

// Default target for rendering
var target = 'files';

switch (casper.cli.args[0]) {
	case 'files':
	case 'stdout':
		target = casper.cli.args[0];
	break;
}

casper.on('page.loaded', function () {

	console.log('Page loaded');
	var frame = 0;

	var captureInterval = 0;

	// Set capture interval function
	captureInterval = setInterval(function () {
		console.log('Capturing ' + (frame++) );

		// Set target
		var targetResource = null;
		switch (target) {
			case 'stdout':
				targetResource = '/dev/stdout';
			break;
			case 'files':
				targetResource = 'frames/frame' + (frame) + '.png';
			break;
			default:
				throw 'Unknown render target: ' + target;
		}

		// Capture 
		casper.capture(targetResource, {
			top: 0,
			left: 0,
			width: 640,
			height: 480
		},
		{
        	format: 'png'
    	});

		// Safeguard. TODO: remove
		if (frame > 500) {
			process.exit();
		}

	}, 25);
})

// Open page
casper.start(page, function () {
	this.emit('page.loaded');
});

// Wait for animations to end
casper.waitFor(function waitForTest() {
	return this.exists('body.all-animations-done');
}, 
function waitForThen() {
	console.log('Done');
},
function waitForTimeout() {
	console.log('Reached timeout');
},
60 * 1000);

casper.run();
