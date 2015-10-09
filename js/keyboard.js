var adapter = require("./adapter");
var list = require("./list");
var image = require("./image");

var handler = function(e) {
	switch (e.keyCode) {
		case 27:
			window.close();
		break;

		case 123:
			adapter.showDevTools();
		break;
		
		case 33: // pgup
		case 37: // left
		case 38: // top
			var prev = list.getPrev(image.getUrl());
			if (prev) { image.load(prev); }
		break;

		case 32: // space
		case 34: // pgdown
		case 39: // right
		case 40: // bottom
			var next = list.getNext(image.getUrl());
			if (next) { image.load(next); }
		break;
		
		case 36: // home
			var first = list.getFirst();
			if (first) { image.load(first); }
		break;

		case 35: // end
			var last = list.getLast();
			if (last) { image.load(last); }
		break;
	}
};

exports.init = function() {
	window.addEventListener("keydown", handler);
}

