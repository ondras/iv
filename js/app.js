var adapter = require("./adapter");
var fullImage = require("./fullImage");
var list = require("./list");
var fs = require("fs");
var register = require("./register").register;

register("devtools", "f12", function() {
	adapter.showDevTools();
});

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
			fullImage.activate(argv[0]);
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
