const fs = require('fs');

const data = fs.readFileSync('./input', 'utf8').trim().split('\n').map(line => line.trim().split(''));

const getGearLocations = (i, j) => {
    return [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ].map(([di, dj]) => ([i + di, j + dj]))
        .filter(([newi, newj]) => data[newi] !== undefined && data[newi][newj] !== undefined)
        .filter(([newi, newj]) => data[newi][newj] === '*');
};

const numbersByGear = {};

for (let i = 0; i < data.length; i++) {
    let num = 0;
    let gears = [];

    for (let j = 0; j < data[i].length; j++) {
        if (String(Number(data[i][j])) !== data[i][j]) {
            if (num > 0) {
                for (const gear of [...new Set(gears)]) {
                    if (!numbersByGear[gear]) {
                        numbersByGear[gear] = [];
                    }

                    numbersByGear[gear].push(num);
                }

                num = 0;
                gears = [];
            }

            continue;
        }

        gears.push(...getGearLocations(i, j).map(g => `${g[0]}:${g[1]}`));

        num = num * 10 + Number(data[i][j]);
    }

    if (num > 0) {
        for (const gear of [...new Set(gears)]) {
            if (!numbersByGear[gear]) {
                numbersByGear[gear] = [];
            }

            numbersByGear[gear].push(num);
        }
    }
}

const sum = Object.entries(numbersByGear).filter(([, nums]) => nums.length === 2).map(([, nums]) => nums[0] * nums[1]).reduce((prev, cur) => prev + cur, 0);

console.log(sum);
