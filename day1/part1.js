const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n').map(line => line.replace(/[^0-9]/g, ''));

let sum = 0;

for (const line of lines) {
    sum += Number(line[0] + line[line.length - 1]);
}

console.log(sum);
