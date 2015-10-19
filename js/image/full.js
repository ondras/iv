var Base = require("./base").Image;
var Magnifier = require("../magnifier").Magnifier;

var Image = function() {
	Base.call(this);
	new Magnifier(this);
}
Object.assign(Image.prototype, Base.prototype);

Image.prototype.load = function(path) {
	if (path == this.getPath()) { return; }
	return Base.prototype.load.call(this, path);
}

exports.Image = Image;
