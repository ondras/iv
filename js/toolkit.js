var name = (window.nwDispatcher ? "nw" : "electron");
var toolkit = require("./toolkit/" + name);
for (var p in toolkit) { exports[p] = toolkit[p]; }
