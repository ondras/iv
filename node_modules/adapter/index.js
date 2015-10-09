var path = (window.nwDispatcher ? "nw" : "electron");
var adapter = require("./" + path + "/adapter");
for (var p in adapter) { exports[p] = adapter[p]; }
