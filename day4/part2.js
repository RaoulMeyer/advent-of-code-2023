const fs = require('fs');

const data = fs.readFileSync('./input', 'utf8').trim().split('\n').map(line => line.split(': ')[1].trim());

let total = 0;

const cards = new Array(data.length).fill(1);

for (let i = 0; i < data.length; i++) {
    const line = data[i];

    const [winning, mine] = line.split(' | ').map(numString => numString.split(/[ ]+/).map(Number));
    const winningSet = new Set(winning);

    let matches = 0;

    for (const num of mine) {
        if (winningSet.has(num)) {
            matches++;
        }
    }

    total += cards[i];

    for (let j = 1; j <= matches; j++) {
        if (!cards[i + j]) {
            continue;
        }

        cards[i + j] += cards[i];
    }
}

console.log(total);
