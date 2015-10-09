var path = require("path");
var fs = require("fs");

var extensions = ["jpg", "jpeg", "png", "gif", "svg"];
var files = [];

var onReaddir = function(err, items) {
	files = items.filter(function(item) {
		var ext = path.extname(item).slice(1).toLowerCase();
		return extensions.indexOf(ext) > -1;
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

exports.init = function(url) {
	var dir = path.dirname(url);
	fs.readdir(dir, onReaddir);
}
