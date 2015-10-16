var registry = {};

exports.register = function(command, func) {
	registry[command] = {
		func: func,
		enabled: true
	};

	return command;
}

exports.enable = function(command) {
	Object.keys(registry).filter(function(c) {
		return c.match(command);
	}).forEach(function(c) {
		registry[c].enabled = true;
	});
}

exports.disable = function(command) {
	Object.keys(registry).filter(function(c) {
		return c.match(command);
	}).forEach(function(c) {
		registry[c].enabled = false;
	});
}

exports.isEnabled = function(command) {
	return registry[command].enabled;
}

exports.execute = function(command) {
	return registry[command].func();
}
