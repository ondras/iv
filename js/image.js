var adapter = require("./adapter");
var node = window.document.querySelector("img");

var scale = 1;
var magnifier = new (require("./magnifier").Magnifier)(node);

var zoom = function() {
	var avail = adapter.getWindowSize();

	var size = [
		Math.round(scale * node.naturalWidth),
		Math.round(scale * node.naturalHeight)
	];

	node.width = size[0];
	node.height = size[1];
	node.style.left = (avail[0]-size[0])/2 + "px";
	node.style.top = (avail[1]-size[1])/2 + "px";
	node.style.display = "block";
}

exports.zoomFit = function() {
	var size = [node.naturalWidth, node.naturalHeight];
	var avail = adapter.getWindowSize();
	var ratio = [avail[0]/size[0], avail[1]/size[1]];
	scale = Math.min(1, ratio[0], ratio[1]);
	zoom();
}

exports.zoomIn = function() {
	scale *= 2;
	zoom();
}

exports.zoomOut = function() {
	scale /= 2;
	zoom();
}

exports.load = function(url) {
	node.src = url;
}

exports.getUrl = function() {
	return node.src;
}

exports.getScale = function() {
	return scale;
}

node.onload = exports.zoomFit;
