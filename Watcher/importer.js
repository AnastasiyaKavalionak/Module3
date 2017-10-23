'use strict';

const csv = require('csv-to-json');
const fs = require('fs');

class Importer {

    constructor () {
    }

    createJSON (filename) {
        csv.parse ({filename:  filename}, function (err, json) {
            if (err) {
                console.log('can not to parse csv to json ' + err);
            } else {
                fs.writeFile(filename.slice(0, -3) + 'json', JSON.stringify(json, null, 2), (err) => {
                    if (err) {
                        console.log('can not to write json file ' + err);
                    }
                })
            }
        })

    }
}

module.exports = Importer;
