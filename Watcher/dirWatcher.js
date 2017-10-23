'use strict';

const fs = require('fs');
const events = require('events');
const emitter = new events.EventEmitter();
let Importer = require('./importer');
let imp = new  Importer();
const watch = require('node-watch');

class DirWatcher {

    constructor () {
        emitter.on ('changed', imp.createJSON);
    }

    watch (path, delay) {
        setTimeout(function () {
            watch(path, { filter: /\.csv$/ }, function(event, name) {
                if (event === 'remove') {
                    fs.unlink(name.slice(0, -3) + 'json', (err) => {
                        if (err) {
                            console.log('can not remove file' + err);
                        }
                    })
                }
                if (event === 'update') {
                    emitter.emit('changed', name);
                }
            });
        }, delay);
    }
}

module.exports = DirWatcher;
