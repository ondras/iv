require("./array.from.js"); // FIXME code smell

var adapter = require("./adapter");
var image = require("./fullImage").image;
var list = require("./list");
var path = require("path");
var fs = require("fs");

var screens = Array.from(window.document.querySelectorAll("body > section"));

var showScreen = function(id) {
	screens.forEach(function(screen) {
		screen.style.display = (screen.id == id ? "" : "none");
	});
	
	adapter.setFullscreen(id == "full");
}

/*
window.nwDispatcher.nwGui.Window.get().on('enter-fullscreen', function() {
	console.log("enter-fullscreen", window.innerWidth, window.innerHeight);
});

window.addEventListener('resize', function(e) {
	console.log(e.type, window.innerWidth, window.innerHeight);
});
*/

var argv = adapter.argv;
if (argv.length > 0) {
	try {
		var stat = fs.statSync(argv[0]);
	} catch (e) {
		window.alert(e.message);
		window.close();
		return;
	}
	
	switch (true) {
		case stat.isFile():
			showScreen("full");
			image.load(argv[0]);
			var dir = path.dirname(argv[0]);
			list.init(dir);
		break;
		
		case stat.isDirectory():
			showScreen("list");
			list.init(argv[0]);
		break;
		
		default:
			window.alert("Sorry, invalid path: " + argv[0]);
			window.close();
		break;
	}

} else {
	// FIXME open _some_ directory
}

exports.showScreen = showScreen;
