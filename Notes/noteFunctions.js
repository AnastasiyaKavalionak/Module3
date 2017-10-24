'use strict';
/**
 * @function reads list of notes from the given json file if it exists, compares existing of given title in the giving list of notes, adds this note (title end body) in the list if didn't find given title in the list and writes new list in given json file
 * @param json name of json file
 * @param title title of note
 * @param body body of note
 */
function add (json, title, body) {
    const fs = require('fs');
    let list;
    if (fs.existsSync(json)) {
        list = require(json);
        if (list['list'] === undefined) {
            list = {'list': [{'title': title, 'body': body}]};
        } else {
            for (let i = 0; i < list['list'].length; i++) {
                if (list['list'][i].title === title) {
                    console.log(`note with title ${title} is already exist in this list`);
                    return;
                }
            }
            list['list'].push({'title': title, 'body': body});
        }
    } else {
        list = {'list': [{'title': title, 'body': body}]};
    }
    const writerStream = fs.createWriteStream(json);
    writerStream.write(JSON.stringify(list, ['list', 'title', 'body'], 2));
    writerStream.end();
}

/**
 * @function reads list of notes from the given json file if it exists and displays it on console
 * @param json name of json file
 */
function noteList (json) {
    const fs = require('fs');
    if (fs.existsSync(json)) {
        let list = require(json);
        if (list['list'] === undefined) {
            console.log(`list with path ${json} is empty`);
        } else {
            for (let i = 0; i < list['list'].length; i++) {
                console.log(`title: ${list['list'][i].title} body: ${list['list'][i].body}`);
            }
        }
    }else {
            console.log(`list with path ${json} is not exist`);
    }
}

/**
 * @function reads list of notes from the given json file if it exists, finds note in this list by given title and displays note on console if found it
 * @param json name of json file
 * @param title title of note
 */
function read (json, title) {
    const fs = require('fs');
    if (fs.existsSync(json)) {
        let list = require(json);
        if (list['list'] === undefined) {
            console.log(`list with path ${json} is empty`);
        } else {
            for (let i = 0; i < list['list'].length; i++) {
                if (list['list'][i].title === title) {
                    console.log(`title: ${list['list'][i].title} body: ${list['list'][i].body}`);
                    return;
                }
            }
        }
        console.log(`note with title ${title} is not exist in this list`);
    }else {
        console.log(`list with path ${json} is not exist`);
    }
}

/**
 * @function reads list of notes from the given json file if it exists, finds note in this list by given title and deletes note from the list if found it
 * @param json name of json file
 * @param title title of note
 */
function remove (json, title) {
    const fs = require('fs');
    if (fs.existsSync(json)) {
        const writerStream = fs.createWriteStream(json);
        let list = require(json);
        if (list['list'] === undefined) {
            console.log(`list with path ${json} is empty`);
        } else {
            for (let i = 0; i < list['list'].length; i++) {
                if (list['list'][i].title === title) {
                    list['list'].splice(i, 1);
                    writerStream.write(JSON.stringify(list));
                    return;
                }
            }
        }
        console.log(`note with title ${title} is not exist in this list`);
        writerStream.end();
    } else {
            console.log(`list with path ${json} is not exist`);
        }
}

module.exports.add = add;
module.exports.list = noteList
module.exports.read = read;
module.exports.remove = remove;
