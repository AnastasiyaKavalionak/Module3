'use strict';

const fs = require('fs');
const events = require('events');
const emitter = new events.EventEmitter();
let Importer = require('./importer');
let imp = new  Importer();
const watch = require('node-watch');

class DirWatcher {

    constructor () {
        emitter.on ('changedSync', function (filename) {
            let json = imp.importSync(filename);
            fs.writeFile(filename.slice(0, -3) + 'json', JSON.stringify(json, null, 2), (err) => {
                if (err) {
                    console.log('can not to write json file ' + err);
                }
            })
        });

        emitter.on ('changedAsync', function (filename) {
            let json = imp.import(filename).then(result => result, error => console.log(error));
            fs.writeFile(filename.slice(0, -3) + 'json', JSON.stringify(json, null, 2), (err) => {
                if (err) {
                    console.log('can not to write json file ' + err);
                }
            })
        });
    }

    watch (path, delay) {
        setTimeout(function () {
            watch(path, { filter: /\.csv$/ }, function(event, name) {
                if (event === 'remove') {
                    console.log(name);
                    fs.unlink(name.slice(0, -3) + 'json', (err) => {
                        if (err) {
                            console.log('can not remove file' + err);
                        }
                    })
                }
                if (event === 'update') {
                    emitter.emit('changedAsync', name);
                }
            });
        }, delay);
    }
}

module.exports = DirWatcher;
