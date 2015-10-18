var full = require("./full");
var Image = require("../image/base").Image;
var register = require("../register").register;
var command = require("../command");
var directory = require("../directory");

var node = window.document.querySelector("#list");
var isActive = false;

function handler(e) {
	var node = e.target;
	while (node && !node.dataset.path) { node = node.parentNode; }
	if (!node) { return; }

	switch (e.type) {
		case "click":
			exports.select(node.dataset.path);
		break;

		case "dblclick":
			full.activate(node.dataset.path);
		break;
	}
}

node.addEventListener("click", handler);
node.addEventListener("dblclick", handler);

function buildThumbs(files) {
	node.innerHTML = "";
	files.forEach(function(file) {
		var wrap = window.document.createElement("div");
		node.appendChild(wrap);

		var img = new Image().load(file);
		node.dataset.path = img.getPath();
		wrap.appendChild(img.getNode());
	});
}


exports.activate = function(path) {
	full.deactivate();
	command.enable(/^list:/);

	isActive = true;
	node.style.display = "";

	directory.load(path);
	directory.on("listed", buildThumbs);
}

exports.deactivate = function() {
	isActive = false;
	command.disable(/^list:/);
	node.style.display = "none";
	directory.removeListener("listed", buildThumbs);
}

register("list:close", "esc", function() {
	window.close();
});
