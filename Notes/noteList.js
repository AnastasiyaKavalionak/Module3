'use strict';

function Add (json, title, body) {
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

function List (json) {
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

function Read (json, title) {
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

function Remove (json, title) {
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

module.exports.Add = Add;
module.exports.List = List;
module.exports.Read = Read;
module.exports.Remove = Remove;
