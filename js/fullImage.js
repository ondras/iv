var adapter = require("./adapter");
var path = require("path");
var list = require("./list");
var keyboard = require("./keyboard");
var command = require("./command");
var Image = require("./image").Image;
var Magnifier = require("./magnifier").Magnifier;

var node = window.document.querySelector("#full");
var image = new Image();

exports.image = image;

exports.activate = function(url) {
	list.deactivate();
	command.enable(/^full:/);

	adapter.setFullscreen(true);
	node.style.display = "";

	image.load(url);
	list.load(path.dirname(url));
}

exports.deactivate = function() {
	command.disable(/^full:/);
	node.style.display = "none";
	adapter.setFullscreen(false);
}

node.appendChild(image.getNode());
new Magnifier(image);

window.addEventListener("resize", function(e) {
	image.zoomFit();
});

var register = function(name, keys, func) {
	command.register(name, func);
	[].concat(keys).forEach(function(key) {
		keyboard.register(name, key);
	});
}

register("full:close", "esc", function() {
	window.close();
});

register("devtools", "f12", function() { // FIXME not full-specific
	adapter.showDevTools();
});

register("full:prev", ["pgup", "left", "up"], function() {
	var prev = list.getPrev(image.getPath());
	if (prev) { image.load(prev); }
});

register("full:next", ["pgdn", "right", "down", "space"], function() {
	var next = list.getNext(image.getPath());
	if (next) { image.load(next); }
});

register("full:first", "home", function() {
	var first = list.getFirst();
	if (first) { image.load(first); }
});

register("full:last", "end", function() {
	var last = list.getLast();
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
