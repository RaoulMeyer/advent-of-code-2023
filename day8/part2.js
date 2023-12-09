const fs = require('fs');

const sections = fs.readFileSync('./input', 'utf8').trim().split('\r\n\r\n');

const instructions = sections[0].split('');
const moves = Object.fromEntries(sections[1].split('\r\n').map(line => [line.split(' = ')[0], line.split(' = ')[1].replaceAll(/[^,0-9A-Z]/g, '').split(',')]));

let i = 0;
let current = Object.keys(moves).filter(str => str[2] === 'A');
const loop = [...current].map(() => []);

do {
    const choice = instructions[i % instructions.length] === 'L' ? 0 : 1;

    for (let j = 0; j < current.length; j++) {
        current[j] = moves[current[j]][choice];

        if (current[j][2] === 'Z') {
            loop[j].push(i + 1);
        }
    }

    i++;

} while (loop.filter(l => l.length >= 2).length !== current.length);

const findSmallestMultiple = (inputs) => {
    const position = inputs.map(l => l[0]);
    const step = inputs.map(l => l[1] - l[0]);

    const found = [];

    do {
        const max = Math.max(...position);
        const min = Math.min(...position);

        for (let j = 0; j < position.length; j++) {
            if (position[j] === max && position[j] !== min) {
                continue;
            }
            position[j] += step[j];
        }

        if ([...new Set(position)].length === 1) {
            found.push(position[0]);
        }
    } while (found.length < 4);

    return [found[0], found[1]];
}

const multipleA = findSmallestMultiple([loop[0], loop[1], loop[2]]);
const multipleB = findSmallestMultiple([loop[3], loop[4], loop[5]]);

const finalMultiple = findSmallestMultiple([multipleA, multipleB]);

console.log(finalMultiple[0]);
