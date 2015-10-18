var Base = require("./base").Image;
var Magnifier = require("../magnifier").Magnifier;

var Image = function() {
	Base.call(this);
	this._node.style.display = "none";
	new Magnifier(this);
}
Image.prototype = Object.create(Base.prototype);

Image.prototype.load = function(path) {
	if (path == this.getPath()) { return; }
	return Base.prototype.load.call(this, path);
}

Image.prototype._onLoad = function(e) {
	Base.prototype._onLoad.call(this, e);
	this._node.style.display = "";
}

exports.Image = Image;
