const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

let sum = 0;

const rev = (str) => str.split('').reverse().join('');

const numberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

const reversedNumberMap = Object.fromEntries(Object.entries(numberMap).map(([key, value]) => [rev(key), value]));

const firstNumber = (line, map) => {
    let minPos = line.length;
    let minNumber = null;

    for (const [str, value] of Object.entries(map)) {
        const pos = line.indexOf(str);
        const posVal = line.indexOf(String(value));

        if (pos >= 0 && pos < minPos) {
            minPos = pos;
            minNumber = value;
        }

        if (posVal >= 0 && posVal < minPos) {
            minPos = posVal;
            minNumber = value;
        }
    }

    return minNumber;
}

for (const line of lines) {
    const first = firstNumber(line, numberMap);
    const last = firstNumber(rev(line), reversedNumberMap);

    sum += Number(String(first) + String(last));
}

console.log(sum);
