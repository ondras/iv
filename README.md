# iv

This project explores features of current Chromium-based UI libraries, namely those of [nw.js](http://nwjs.io/) and [Electron](http://electron.atom.io/).

A sample native application -- a lightweight image viewer -- is implemented using HTML, CSS and JavaScript, leveraging APIs provided by these frameworks. The app can be run using either nw.js or Electron, as there is a very thin compatibility [facade](https://en.wikipedia.org/wiki/Facade_pattern) that allows writing cross-toolkit code.

The main goal here is to **learn** how to develop a native app using Web technology; nw.js/Electron comparison is a side product.

## Features, planned and implemented

- [x] Fullscreen viewing
  - [x] Keyboard controls
  - [x] Mouse magnifier
  - [ ] Panning
- [x] Grid-based directory viewing
- [ ] Filesystem traversal/tree
- [ ] EXIF
- [ ] Clipboard support
- [ ] Image operations
  - [ ] File operations (rename, delete, ...)
  - [ ] Geometry adjustments (rotation, mirroring)
  - [ ] Pixel adjustments (brightness, desaturation, colorization, blur, ...)
  - [ ] Saving

## Running

1. Clone this project
2. `npm install electron-prebuilt` if you want to run it using Electron
  1. `./run-electron.sh [path-to-image-file]`
  2. if this fails, adjust your path in the file above
3. `npm install nw` if you want to run it using nw.js
  1. `./run-nw.sh [path-to-image-file]`
  2. if this fails, adjust your path in the file above

## FAQ

#### No ES6/ES2015?
There is a limited ES6 support in Electron, but almost none in nw.js. Once nw.js 0.13 (with recent V8) is out, the code will be re-written in ES6.

#### Only one FAQ question?
No, two of them.
