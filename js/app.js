var toolkit = require("./toolkit");
var full = require("./view/full");
var list = require("./view/list");
var fs = require("fs");
var path = require("path");
var register = require("./register").register;

register("devtools", "f12", function() {
	toolkit.showDevTools();
});

var argv = toolkit.argv;
if (argv.length > 0) {
	var fullPath = path.resolve(argv[0]);
	try {
		var stat = fs.statSync(fullPath);
	} catch (e) {
		window.alert(e.message);
		window.close();
		return;
	}
	
	switch (true) {
		case stat.isFile():
			full.activate(fullPath);
		break;
		
		case stat.isDirectory():
			list.activate(fullPath);
		break;
		
		default:
			window.alert("Sorry, invalid path: " + fullPath);
			window.close();
		break;
	}

} else {
	list.activate();
}
