var registry = {};

exports.define = function(command, func) {
	registry[command] = {
		func: func,
		enabled: true
	};
}

exports.enable = function(command) {
	registry[command].enabled = true;
}

exports.disable = function(command) {
	registry[command].enabled = false;
}

exports.isEnabled = function(command) {
	return registry[command].enabled;
}

exports.execute = function(command) {
	return registry[command].func();
}
