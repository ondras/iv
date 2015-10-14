var adapter = require("./adapter");

var Image = require("./image").Image;
var Magnifier = require("./magnifier").Magnifier;

var parent = window.document.querySelector("#full");
var image = new Image();
parent.appendChild(image.getNode());

new Magnifier(image);

exports.image = image;

var keyboard = require("./keyboard");
keyboard.init();
