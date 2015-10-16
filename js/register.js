var keyboard = require("./keyboard");
var command = require("./command");

exports.register = function(name, keys, func) {
	command.register(name, func);
	[].concat(keys).forEach(function(key) {
		keyboard.register(name, key);
	});
}
