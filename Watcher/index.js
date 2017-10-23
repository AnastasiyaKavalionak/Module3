'use strict';

let DirWatcher = require('./dirWatcher');

let dw = new DirWatcher();
dw.watch('./data', 1000);
