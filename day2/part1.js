const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

let sum = 0;

const available = {
    red: 12,
    green: 13,
    blue: 14,
};

for (const line of lines) {
    const [game, drawsString] = line.split(': ');

    const gameId = Number(game.split(' ')[1]);

    const draws = drawsString
        .split('; ')
        .map(draw => draw
            .split(', ')
            .map(item => [Number(item.split(' ')[0]), item.split(' ')[1]])
        );

    let possible = true;

    for (const draw of draws) {
        for (const [amount, color] of draw) {
            if (available[color] < amount) {
                possible = false;
            }
        }
    }

    if (possible) {
        sum += gameId;
    }
}

console.log(sum);
