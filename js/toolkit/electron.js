var remote = require("remote");

exports.showDevTools = function() {
   	remote.getCurrentWindow().openDevTools();
}

exports.argv = remote.process.argv.slice(2);

exports.setFullscreen = function(fullscreen) {
   	remote.getCurrentWindow().setFullScreen(fullscreen);
   	return fullscreen;
}

exports.getWindowSize = function() {
	return [window.innerWidth, window.innerHeight];
}
