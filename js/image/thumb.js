var path = require("path");
var Base = require("./base").Image;

var Image = function() {
	Base.call(this);

	this._wrap = window.document.createElement("figure");
	this._wrap.appendChild(this._node);

	this._name = window.document.createElement("figcaption");
	this._wrap.appendChild(this._name);
}
Object.assign(Image.prototype, Base.prototype);

Image.prototype.getNode = function() {
	return this._wrap;
}

Image.prototype.load = function(imagePath) {
	var base = path.basename(imagePath);
	this._name.innerHTML = "";
	this._name.appendChild(window.document.createTextNode(base));
	
	return Base.prototype.load.call(this, imagePath);
}

Image.prototype.focus = function() {
	this._wrap.classList.add("focus");
}

Image.prototype.blur = function() {
	this._wrap.classList.remove("focus");
}

Image.prototype._getAvailableSize = function() {
	var avail = Base.prototype._getAvailableSize.call(this);
	avail[1] -= this._name.offsetHeight;
	return avail;
}

exports.Image = Image;
