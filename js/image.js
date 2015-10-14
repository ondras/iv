var adapter = require("./adapter");

var Image = function() {
	this._scale = 1;
	this._node = window.document.createElement("img");

	this._node.style.display = "none";
	this._node.onload = function(e) { // FIXME event leak
		console.log("onload", window.innerWidth, window.innerHeight);
		this.zoomFit(); 
		this._node.style.display = "";
	}.bind(this);
}

Image.prototype.getNode = function() {
	return this._node;
}

Image.prototype.load = function(url) {
	this._node.src = url;
	return this;
}

Image.prototype.zoomFit = function() {
	var parent = this._node.parentNode;
	var avail = [parent.offsetWidth, parent.offsetHeight];
	var size = [this._node.naturalWidth, this._node.naturalHeight];
	var ratio = [avail[0]/size[0], avail[1]/size[1]];
	this._scale = Math.min(1, ratio[0], ratio[1]);
	return this._doZoom();
}

Image.prototype._doZoom = function() {
	var parent = this._node.parentNode;
	var avail = [parent.offsetWidth, parent.offsetHeight];

	var size = [
		Math.round(this._scale * this._node.naturalWidth),
		Math.round(this._scale * this._node.naturalHeight)
	];

	this._node.width = size[0];
	this._node.height = size[1];
	this._node.style.left = (avail[0]-size[0])/2 + "px";
	this._node.style.top = (avail[1]-size[1])/2 + "px";

	return this;
}

Image.prototype.zoomIn = function() {
	this._scale *= 2;
	return this._doZoom();
}

Image.prototype.zoomOut = function() {
	this._scale /= 2;
	return this._doZoom();
}

Image.prototype.getUrl = function() {
	return this._node.src;
}

Image.prototype.getScale = function() {
	return this._scale;
}

exports.Image = Image;
