var adapter = require("./adapter");
var node = window.document.querySelector("img");

exports.fit = function() {
	var size = [node.naturalWidth, node.naturalHeight];
	var avail = adapter.getWindowSize();
	var ratio = [size[0]/avail[0], size[1]/avail[1]];
	var max = Math.max(ratio[0], ratio[1]);

	if (max >= 1) { /* scale down */
		size[0] = Math.round(size[0]/max);
		size[1] = Math.round(size[1]/max);
	} else { /* center */
	}
	node.width = size[0];
	node.height = size[1];
	node.style.left = (avail[0]-size[0])/2 + "px";
	node.style.top = (avail[1]-size[1])/2 + "px";
	node.style.display = "block";
}

exports.load = function(url) {
	node.src = url;
}

exports.getUrl = function() {
	return node.src;
}

node.onload = exports.fit;
