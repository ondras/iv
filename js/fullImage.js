var adapter = require("./adapter");
var path = require("path");
var list = require("./list");
var directory = require("./directory");
var register = require("./register").register;
var command = require("./command");

var image = new (require("./image").Image)();
new (require("./magnifier").Magnifier)(image);

var node = window.document.querySelector("#full");
node.appendChild(image.getNode());

window.addEventListener("resize", function(e) {
	image.zoomFit();
});

exports.activate = function(imagePath) {
	list.deactivate();
	command.enable(/^full:/);

	adapter.setFullscreen(true);
	node.style.display = "";

	image.load(imagePath);
	directory.load(path.dirname(imagePath));
}

exports.deactivate = function() {
	command.disable(/^full:/);
	node.style.display = "none";
	adapter.setFullscreen(false);
}

register("full:close", "esc", function() {
	window.close();
});

register("full:list", "enter", function() {
	list.activate(path.dirname(image.getPath()));
});

register("full:prev", ["pgup", "left", "up"], function() {
	var prev = directory.getPrev(image.getPath());
	if (prev) { image.load(prev); }
});

register("full:next", ["pgdn", "right", "down", "space"], function() {
	var next = directory.getNext(image.getPath());
	if (next) { image.load(next); }
});

register("full:first", "home", function() {
	var first = directory.getFirst();
	if (first) { image.load(first); }
});

register("full:last", "end", function() {
	var last = directory.getLast();
	if (last) { image.load(last); }
});

register("full:zoomin", "+", function() {
	image.zoomIn();
});

register("full:zoomout", "-", function() {
	image.zoomOut();
});

register("full:zoomfit", "*", function() {
	image.zoomFit();
});
