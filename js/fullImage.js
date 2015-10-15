var adapter = require("./adapter");
var path = require("path");

var list = require("./list");
var Image = require("./image").Image;
var Magnifier = require("./magnifier").Magnifier;

var node = window.document.querySelector("#full");
var image = new Image();
node.appendChild(image.getNode());

new Magnifier(image);

window.addEventListener("resize", function(e) {
	image.zoomFit();
});

exports.image = image;

var keyboard = require("./keyboard");
keyboard.init();

exports.activate = function(url) {
	list.deactivate();

	adapter.setFullscreen(true);
	node.style.display = "";

	image.load(url);
	list.load(path.dirname(url));
}

exports.deactivate = function() {
	node.style.display = "none";
	adapter.setFullscreen(false);
}
