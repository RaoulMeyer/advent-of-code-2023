const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\r\n').map(line => line.split(':')[1].replaceAll(' ', '')).map(str => Number(str));

const time = lines[0];
const distance = lines[1];

let wins = 0;

for (let i = 0; i < time; i++) {
    if ((time - i) * i > distance) {
        wins++;
    }
}

console.log(wins);

