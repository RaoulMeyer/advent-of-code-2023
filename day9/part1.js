const fs = require('fs');

const numbers = fs.readFileSync('./input', 'utf8').trim().split('\r\n').map(line => line.split(' ').map(Number));

let total = 0;

for (const start of numbers) {
    const history = [start];

    do {
        const lastHistory = history[history.length - 1];
        const newHistory = [];

        for (let i = 0; i < lastHistory.length - 1; i++) {
            newHistory.push(lastHistory[i + 1] - lastHistory[i]);
        }

        history.push(newHistory);

    } while (Math.max(...history[history.length - 1]) !== 0 || Math.min(...history[history.length - 1]) !== 0);

    history[history.length - 1].push(0);

    for (let i = history.length - 2; i >= 0; i--) {
        history[i].push(history[i][history[i].length - 1] + history[i + 1][history[i].length - 1]);
    }

    total += history[0][history[0].length - 1];
}

console.log(total);
