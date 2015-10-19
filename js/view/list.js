var full = require("./full");
var Image = require("../image/thumb").Image;
var register = require("../register").register;
var command = require("../command");
var directory = require("../directory");

var parent = window.document.querySelector("#list");
var thumbs = [];
var activeThumb = null;

function handler(e) {
	var thumb = thumbs.filter(function(t) { return t.getNode() == e.currentTarget; })[0];

	switch (e.type) {
		case "click":
			focusThumb(thumb);
		break;

		case "dblclick":
			full.activate(thumb.getPath());
		break;
	}
}

function clearThumbs() {
	while (thumbs.length) {
		var thumb = thumbs.shift();
		var node = thumb.getNode();
		node.removeEventListener("click", handler);
		node.removeEventListener("dblclick", handler);
	}
	parent.innerHTML = "";
}

function buildThumbs(files) {
	clearThumbs();

	thumbs = files.map(function(file) {
		var thumb = new Image().load(file);
		var node = thumb.getNode();
		node.addEventListener("click", handler);
		node.addEventListener("dblclick", handler);

		parent.appendChild(node);
		return thumb;
	});

	focusPath(full.getPath());
}

function focusThumb(thumb) {
	activeThumb && activeThumb.blur();
	activeThumb = thumb;
	activeThumb.focus();

	/* scrollIntoView not sufficient in chrome */
	activeThumb.getNode().scrollIntoView();
}

function focusPath(path) {
	var avail = thumbs.filter(function(t) { return t.getPath() == path; });
	if (avail.length) { focusThumb(avail[0]); }
}

exports.activate = function(path) {
	full.deactivate();
	command.enable(/^list:/);

	parent.style.display = "";

	directory.on("listed", buildThumbs);
	directory.load(path);

	var fullPath = full.getPath();
	if (fullPath && thumbs.length) { focusPath(fullPath); }
}

exports.deactivate = function() {
	command.disable(/^list:/);
	parent.style.display = "none";
	directory.removeListener("listed", buildThumbs);
}

register("list:close", "esc", function() {
	window.close();
});

register("list:full", "enter", function() {
	full.activate(activeThumb.getPath());
});

register("list:prev", "left", function() {
	if (!activeThumb) { return; }
	var index = thumbs.indexOf(activeThumb);
	index = Math.max(index-1, 0);
	focusThumb(thumbs[index]);
});

register("list:next", "right", function() {
	if (!activeThumb) { return; }
	var index = thumbs.indexOf(activeThumb);
	index = Math.min(index+1, thumbs.length-1);
	focusThumb(thumbs[index]);
});
