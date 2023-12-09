const fs = require('fs');

const sections = fs.readFileSync('./input', 'utf8').trim().split('\r\n\r\n');

const instructions = sections[0].split('');
const moves = Object.fromEntries(sections[1].split('\r\n').map(line => [line.split(' = ')[0], line.split(' = ')[1].replaceAll(/[^,A-Z]/g, '').split(',')]));

let i = 0;
let current = 'AAA';

do {
    current = moves[current][instructions[i % instructions.length] === 'L' ? 0 : 1];

    i++;
} while (current !== 'ZZZ');

console.log(i);
