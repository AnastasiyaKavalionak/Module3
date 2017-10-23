'use strict';

const csv = require('csv-to-json');
const fs = require('fs');

class Importer {

    constructor () {
    }

    importSync (filename) {
        csv.parse ({filename:  filename}, function (err, json) {
            if (err) {
                console.log('can not to parse csv to json ' + err);
            } else {
                return JSON.stringify(json, null, 2);
            }
        })
    }

    import (filename) {
        return new Promise(function (resolve, reject) {
            csv.parse ({filename:  filename}, function (err, json) {
                if (err) {
                    reject('can not to parse csv to json ' + err);
                } else {
                    resolve(JSON.stringify(json, null, 2));
                }
            })
        })
    }
}

module.exports = Importer;
