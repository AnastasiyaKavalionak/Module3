'use strict';

const noteList = require('./noteFunctions');

const path = './files/first.json';

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter action name and its parameters: ', (answer) => {
    let data = answer.split(' ');
    switch (data.shift().toLowerCase()) {
        case 'add': noteList.add(path, data.shift(), data.join(' ')); break;
        case 'list': noteList.list(path); break;
        case 'read': noteList.read(path, data.shift()); break;
        case 'remove': noteList.remove(path, data.shift()); break;
        default: console.log(`unknown method`);
    }
    rl.close();
});


