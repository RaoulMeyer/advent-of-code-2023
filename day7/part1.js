const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\r\n').map(line => line.split(' '));

const rankings = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const getScore = (str) => {
    const charOccurrences = {};

    for (const char of str.split('')) {
        if (!charOccurrences[char]) {
            charOccurrences[char] = 0;
        }

        charOccurrences[char]++;
    }

    const charEntries = Object.entries(charOccurrences).sort((a, b) => b[1] - a[1]).map(([a, b]) => b);

    if (charEntries[0] === 5) {
        return 10;
    }
    if (charEntries[0] === 4) {
        return 9;
    }
    if (charEntries[0] === 3 && charEntries.length === 2) {
        return 8;
    }
    if (charEntries[0] === 3) {
        return 7;
    }
    if (charEntries[0] === 2 && charEntries[1] === 2) {
        return 6;
    }
    if (charEntries[0] === 2) {
        return 5;
    }

    return 4;
}

const getFinalScore = (str) => {
    let score = getScore(str);

    for (const char of str) {
        score *= 1000;

        score += 50 - rankings.indexOf(char);
    }

    return score;
}

let result = 0;

const sorted = lines.sort((a, b) => getFinalScore(a[0]) - getFinalScore(b[0]));

for (let i = 0; i < sorted.length; i++) {
    result += (i + 1) * Number(sorted[i][1]);
}

console.log(result);

// 253130523 too high
