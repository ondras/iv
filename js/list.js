var path = require("path");
var fs = require("fs");
var Image = require("./image").Image;

var extensions = ["jpg", "jpeg", "png", "gif", "svg"];
var files = [];
var node = window.document.querySelector("#list");

var filterItems = function(items, dir) {
	files = items.filter(function(item) {
		var ext = path.extname(item).slice(1).toLowerCase();
		return extensions.indexOf(ext) > -1;
	}).map(function(item) {
		return path.join(dir, item);
	});

	node.innerHTML = "";
	files.forEach(function(file) {
		var wrap = window.document.createElement("div");
		node.appendChild(wrap);

		var img = new Image().load(file);
		wrap.appendChild(img.getNode());
		
		img.zoomFit();
	});
}

exports.getFirst = function() {
	return files[0];
} 

exports.getLast = function() {
	return files[files.length-1];
} 

exports.getPrev = function(url) {
	if (!files.length) { return null; }

	var name = path.basename(url);
	var index = files.indexOf(name);
	if (index > -1) {
		if (index == 0) { return null; }
		return files[index-1];
	} else {
		return exports.getLast();
	}
}

exports.getNext = function(url) {
	if (!files.length) { return null; }

	var name = path.basename(url);
	var index = files.indexOf(name);
	if (index > -1) {
		if (index == files.length-1) { return null; }
		return files[index+1];
	} else {
		return exports.getFirst();
	}
}

exports.init = function(dir) {
	console.log(dir);
	fs.readdir(dir, function(err, items) {
		filterItems(items, dir);
	});
}
