var app = require("app");
var BrowserWindow = require("browser-window");

app.on("window-all-closed", function() {
	if (process.platform != "darwin") {
		app.quit();
	}
});

app.on("ready", function() {
	var win = new BrowserWindow({width: 800, height: 600});
	win.setMenu(null);
	win.loadUrl('file://' + __dirname + '/../../index.html');
});
