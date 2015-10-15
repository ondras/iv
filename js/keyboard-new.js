var command = require("./command");
var registry = [];

var handler = function(e) {
	var available = registry.filter(function(reg) {
		if ("ctrl" in reg && reg.ctrlKey != e.ctrlKey) { return false; }
		if ("alt" in reg && reg.altKey != e.altKey) { return false; }
		if ("shift" in reg && reg.shiftKey != e.shiftKey) { return false; }
		if ("meta" in reg && reg.metaKey != e.metaKey) { return false; }

		if (e.type == "keydown" && reg.key == e.keyCode) { return true; }
		if (e.type == "keypress" && reg.ch == String.fromCharCode(e.charCode)) { return true; }

		return false;
	});

	available = available.filter(function(reg) {
		return command.isEnabled(reg.command);
	});

	if (available.length) {
		command.execute(available[0].command);
	}
}

exports.register = function(command, reg) {
	reg.command = command;
	registry.push(reg)
}

window.addEventListener("keydown", handler);
window.addEventListener("keypress", handler);
