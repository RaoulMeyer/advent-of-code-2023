const fs = require('fs');

const data = fs.readFileSync('./input', 'utf8').trim().split('\n').map(line => line.split(': ')[1].trim());

const cache = {};

const getLineScore = (index) => {
    if (!data[index]) {
        return 0;
    }

    if (cache[index]) {
        return cache[index];
    }

    const line = data[index];

    const [winning, mine] = line.split(' | ').map(numString => numString.split(/[ ]+/).map(Number));
    const winningSet = new Set(winning);

    let matches = 0;

    for (const num of mine) {
        if (winningSet.has(num)) {
            matches++;
        }
    }

    cache[index] = matches === 0 ? 0 : Math.pow(2, matches - 1);

    return cache[index];
}

let total = 0;

for (const line of data) {
    const [winning, mine] = line.split(' | ').map(numString => numString.split(/[ ]+/).map(Number));
    const winningSet = new Set(winning);

    let matches = 0;

    for (const num of mine) {
        if (winningSet.has(num)) {
            matches++;
        }
    }

    total += matches === 0 ? 0 : Math.pow(2, matches - 1);
}

console.log(total);
