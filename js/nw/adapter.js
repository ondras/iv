var gui = window.nwDispatcher.nwGui;

exports.showDevTools = function() {
	gui.Window.get().showDevTools();
}

exports.argv = gui.App.argv;

exports.setFullscreen = function(fullscreen) {
	gui.Window.get().isFullscreen = fullscreen;
	return fullscreen;
}

exports.getWindowSize = function() {
	var win = gui.Window.get();
	return [win.width, win.height];
}
