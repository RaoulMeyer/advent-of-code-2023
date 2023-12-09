const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\r\n').map(line => line.split(' ').filter(Boolean));

const races = [];

for (let i = 1; i < lines[0].length; i++) {
    races.push({ time: Number(lines[0][i]), distance: Number(lines[1][i]) });
}

let total = 1;

for (const race of races) {
    let wins = 0;

    for (let i = 0; i < race.time; i++) {
        if ((race.time - i) * i > race.distance) {
            wins++;
        }
    }

    total *= wins;
}

console.log(total);

