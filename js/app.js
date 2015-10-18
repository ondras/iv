var toolkit = require("./toolkit");
var full = require("./view/full");
var list = require("./view/list");
var fs = require("fs");
var register = require("./register").register;

register("devtools", "f12", function() {
	toolkit.showDevTools();
});

var argv = toolkit.argv;
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
			full.activate(argv[0]);
		break;
		
		case stat.isDirectory():
			list.activate(argv[0]);
		break;
		
		default:
			window.alert("Sorry, invalid path: " + argv[0]);
			window.close();
		break;
	}

} else {
	list.activate();
}
