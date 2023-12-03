const fs = require('fs');

const data = fs.readFileSync('./input', 'utf8').trim().split('\n').map(line => line.trim().split(''));

const hasSymbolAdjacent = (i, j) => {
    return [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ].map(([di, dj]) => data[i + di] && data[i + di][j + dj]).filter(field => field !== undefined && field !== '.' && String(Number(field)) !== field).length > 0;
};

const included = [];
const excluded = [];

for (let i = 0; i < data.length; i++) {
    let num = 0;
    let shouldAdd = false;

    for (let j = 0; j < data[i].length; j++) {
        if (String(Number(data[i][j])) !== data[i][j]) {
            if (num > 0) {
                shouldAdd ? included.push(num) : excluded.push(num);

                num = 0;
                shouldAdd = false;
            }

            continue;
        }

        if (hasSymbolAdjacent(i, j)) {
            shouldAdd = true;
        }

        num = num * 10 + Number(data[i][j]);
    }

    if (num > 0) {
        shouldAdd ? included.push(num) : excluded.push(num);
    }
}

const sum = included.reduce((prev, cur) => prev + cur, 0);

console.log(sum);
