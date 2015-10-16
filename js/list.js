var fs = require("fs");
var path = require("path");
var fullImage = require("./fullImage");
var Image = require("./image").Image;

var node = window.document.querySelector("#list");
var extensions = ["jpg", "jpeg", "png", "gif", "svg"];
var files = [];
var isActive = false;

node.addEventListener("click", function(e) {
	var target = e.target;
	if (target.src) {
		fullImage.activate(target.src);
	}
})

var filterItems = function(items, dir) {
	files = items.filter(function(item) {
		var ext = path.extname(item).slice(1).toLowerCase();
		return extensions.indexOf(ext) > -1;
	}).map(function(item) {
		return path.join(dir, item);
	});
	console.log(files);

	if (isActive) { buildThumbs(); }
}

var buildThumbs = function() {
	node.innerHTML = "";
	files.forEach(function(file) {
		var wrap = window.document.createElement("div");
		node.appendChild(wrap);

		var img = new Image().load(file);
		wrap.appendChild(img.getNode());
	});
}

exports.getFirst = function() {
	return files[0];
} 

exports.getLast = function() {
	return files[files.length-1];
} 

exports.getPrev = function(path) {
	if (!files.length) { return null; }

	var index = files.indexOf(path);
	if (index > -1) {
		if (index == 0) { return null; }
		return files[index-1];
	} else {
		return exports.getLast();
	}
}

exports.getNext = function(path) {
	if (!files.length) { return null; }

	var index = files.indexOf(path);
	if (index > -1) {
		if (index == files.length-1) { return null; }
		return files[index+1];
	} else {
		return exports.getFirst();
	}
}

exports.load = function(dir) {
	dir = path.resolve(dir);
	fs.readdir(dir, function(err, items) {
		filterItems(items, dir);
	});
}

exports.activate = function() {
	fullImage.deactivate();

	isActive = true;
	node.style.display = "";
	buildThumbs();
}

exports.deactivate = function() {
	isActive = false;
	node.style.display = "none";
}
