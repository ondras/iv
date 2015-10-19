require("./object.assign");

var gui = window.nwDispatcher.nwGui;

exports.argv = gui.App.argv;

exports.showDevTools = function() {
	gui.Window.get().showDevTools();
}

exports.setFullscreen = function(fullscreen) {
	gui.Window.get().isFullscreen = fullscreen;
	return fullscreen;
}
