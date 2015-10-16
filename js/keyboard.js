var command = require("./command");
var registry = [];

var handler = function(e) {
	var available = registry.filter(function(reg) {
		if (reg.type != e.type) { return false; }

		for (var m in reg.modifiers) {
			if (reg.modifiers[m] != e[m]) { return false; }
		}

		var code = (e.type == "keypress" ? e.charCode : e.keyCode);
		if (reg.code != code) { return false; }
		if (!command.isEnabled(reg.command)) { return false; }

		return true;
	});

	if (available.length) { command.execute(available[0].command); }
}

var codes = {
	back: 8,
	tab: 9,
	enter: 13,
	esc: 27,
	space: 32,
	pgup: 33,
	pgdn: 34,
	end: 35,
	home: 36,
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	ins: 45,
	del: 46,
	f1: 112,
	f2: 113,
	f3: 114,
	f4: 115,
	f5: 116,
	f6: 117,
	f7: 118,
	f8: 119,
	f9: 120,
	f10: 121,
	f11: 122,
	f12: 123
};

var modifiers = ["ctrl", "alt", "shift", "meta"]; // meta = command

var parse = function(key) {
	var result = {
		modifiers: {}
	};

	key = key.toLowerCase();

	modifiers.forEach(function(mod) {
		var key = mod + "Key";
		result.modifiers[key] = false;

		var re = new RegExp(mod + "[+-]");
		key = key.replace(re, function() {
			result.modifiers[key] = true;
			return "";
		});
	});

	if (key.length == 1) {
		result.code = key.charCodeAt(0);
		result.type = "keypress";
	} else {
		if (!(key in codes)) { throw new Error("Unknown keyboard code " + key); }
		result.code = codes[key];
		result.type = "keydown";
	}

	return result;
}

exports.register = function(command, key) {
	var reg = parse(key);
	reg.command = command;
	registry.push(reg);
}

window.addEventListener("keydown", handler);
window.addEventListener("keypress", handler);
