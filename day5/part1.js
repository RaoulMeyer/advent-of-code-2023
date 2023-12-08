const fs = require('fs');

const sections = fs.readFileSync('./input', 'utf8').trim().split('\r\n\r\n');

const [start, ...rawMaps] = sections;

const maps = rawMaps.map(mapSection => mapSection.trim().split('\r\n').slice(1).map(mapLine => mapLine.split(' ').map(Number)));

const initialSeeds = start.split(' ').map(Number).slice(1);

let min = null;

for (let seed of initialSeeds) {
    for (const map of maps) {
        for (const [destination, start, length] of map) {
            if (seed < start || seed > start + length) {
                continue;
            }

            seed += destination - start;
            break;
        }
    }

    if (min === null) {
        min = seed;
    }

    min = Math.min(min, seed);
}

console.log(min);

