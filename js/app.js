var adapter = require("./adapter");
var image = require("./image");
var list = require("./list");
var keyboard = require("./keyboard");

keyboard.init();

var argv = adapter.argv;
if (argv.length > 0) {
	adapter.setFullscreen(true);

	image.load(argv[0]);
	list.init(argv[0]);
}
