var Image = function() {
	this._path = "";
	this._scale = 1;
	this._node = window.document.createElement("img");
}

Image.prototype.getNode = function() {
	return this._node;
}

Image.prototype.load = function(path) {
	this._path = path;
	this._node.onload = this._onLoad.bind(this);
	this._node.style.display = "none";
	this._node.src = path;
	return this;
}

Image.prototype.zoomFit = function() {
	var avail = this._getAvailableSize();
	var size = [this._node.naturalWidth, this._node.naturalHeight];
	var ratio = [avail[0]/size[0], avail[1]/size[1]];
	this._scale = Math.min(1, ratio[0], ratio[1]);
	return this._doZoom();
}

Image.prototype._getAvailableSize = function() {
	var parent = this._node.parentNode;
	return [parent.clientWidth, parent.clientHeight];
}

Image.prototype._onLoad = function(e) {
	this._node.onload = null;
	this.zoomFit(); 
	this._node.style.display = "";
}

Image.prototype._doZoom = function() {
	var avail = this._getAvailableSize();

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

Image.prototype.getPath = function() {
	return this._path;
}

Image.prototype.getScale = function() {
	return this._scale;
}

exports.Image = Image;
