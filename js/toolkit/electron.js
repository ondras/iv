var remote = require("remote");

exports.argv = remote.process.argv.slice(2);

exports.showDevTools = function() {
   	remote.getCurrentWindow().openDevTools();
}

exports.setFullscreen = function(fullscreen) {
   	remote.getCurrentWindow().setFullScreen(fullscreen);
   	return fullscreen;
}
