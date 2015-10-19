var name = (window.nwDispatcher ? "nw" : "electron");
var toolkit = require("./toolkit/" + name);
Object.assign(exports, toolkit);
