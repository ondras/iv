var Magnifier = function(image) {
	this._image = image;
	var R = 150;

	this._canvas = window.document.createElement("canvas");
	this._canvas.style.position = "absolute";
	this._canvas.style.transform = "translate(-50%, -50%)";
	this._canvas.width = this._canvas.height = 2*R;
	
	this._image.getNode().addEventListener("mousedown", this);
}

Magnifier.prototype.handleEvent = function(e) {
	switch (e.type) {
		case "mousedown":
			e.preventDefault(); // no drag'n' drop
			
			if (this._image.getScale() >= 1) { return; }
			window.addEventListener("mousemove", this);
			window.addEventListener("mouseup", this);
			
			this._image.getNode().parentNode.appendChild(this._canvas);
			this._showAtEvent(e);
		break;

		case "mousemove":
			this._showAtEvent(e);
		break;

		case "mouseup":
			this._canvas.parentNode.removeChild(this._canvas);

			window.removeEventListener("mousemove", this);
			window.removeEventListener("mouseup", this);
		break;
	}
}

Magnifier.prototype._showAtEvent = function(e) {
	var imageNode = this._image.getNode();
	var imageRect = imageNode.getBoundingClientRect();
	var parentRect = imageNode.parentNode.getBoundingClientRect();
	 
	var x = e.clientX - parentRect.left;
	var y = e.clientY - parentRect.top;
	this._canvas.style.left = x + "px";
	this._canvas.style.top = y + "px";
	
	var ctx = this._canvas.getContext("2d");
	var scale = this._image.getScale();
	var sx = Math.round((e.clientX - imageRect.left) / scale);
	var sy = Math.round((e.clientY - imageRect.top) / scale);
	
	var R = this._canvas.width/2;
	ctx.save();
	ctx.beginPath();
	ctx.arc(R, R,R, 0, 2*Math.PI);
	ctx.fill();
	ctx.globalCompositeOperation = "source-in";

	ctx.drawImage(this._image.getNode(), 
		sx-R, sy-R, 2*R, 2*R,
		0, 0, 2*R, 2*R
	);
	
	ctx.restore();
}

exports.Magnifier = Magnifier;
