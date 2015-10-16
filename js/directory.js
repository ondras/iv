var fs = require("fs");
var path = require("path");
var emitter = new (require("events").EventEmitter)();

var extensions = ["jpg", "jpeg", "png", "gif", "svg"];
var files = [];

function filterItems(items, dir) {
	files = items.filter(function(item) {
		var ext = path.extname(item).slice(1).toLowerCase();
		return extensions.indexOf(ext) > -1;
	}).map(function(item) {
		return path.join(dir, item);
	});

	emitter.emit("listed", files);
}

exports.on = emitter.on.bind(emitter);
exports.removeListener = emitter.removeListener.bind(emitter);

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

exports.load = function(dirPath) {
	dirPath = path.resolve(dirPath || "");
	fs.readdir(dirPath, function(err, items) {
		filterItems(items, dirPath);
	});
}
