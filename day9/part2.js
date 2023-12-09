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

    history[history.length - 1].unshift(0);

    for (let i = history.length - 2; i >= 0; i--) {
        history[i].unshift(history[i][0] - history[i + 1][0]);
    }

    total += history[0][0];
}

console.log(total);
