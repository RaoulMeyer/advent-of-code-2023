const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

let sum = 0;

for (const line of lines) {
    const [, drawsString] = line.split(':');

    const draws = drawsString
        .trim()
        .split('; ')
        .map(draw => draw
            .split(', ')
            .map(item => [Number(item.split(' ')[0]), item.split(' ')[1]])
        );

    const needed = {
        red: 0,
        blue: 0,
        green: 0,
    };

    for (const draw of draws) {
        for (const [amount, color] of draw) {
            if (needed[color] < amount) {
                needed[color] = amount;
            }
        }
    }

    sum += needed.red * needed.blue * needed.green;
}

console.log(sum);
