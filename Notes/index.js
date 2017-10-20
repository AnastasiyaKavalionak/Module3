'use strict';

const noteList = require('./noteList');

let path = './files/first.json';

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter action name, title and body of your note ', (answer) => {
    let data = answer.split(' ');
    switch (data.shift().toLowerCase()) {
        case 'add': noteList.Add(path, data.shift(), data.join(' ')); break;
        case 'list': noteList.List(path); break;
        case 'read': noteList.Read(path, data.shift()); break;
        case 'remove': noteList.Remove(path, data.shift()); break;
        default: console.log(`unknown method`);
    }
});

rl.close();