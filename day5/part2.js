const fs = require('fs');

const sections = fs.readFileSync('./input', 'utf8').trim().split('\r\n\r\n');

const [start, ...rawMaps] = sections;

const maps = rawMaps.map(mapSection => mapSection.trim().split('\r\n').slice(1).map(mapLine => mapLine.split(' ').map(Number)));

const initialSeeds = start.split(' ').map(Number).slice(1);

const mergeRanges = (ranges) => {
    const newRanges = [];

    for (const range of ranges) {
        let added = false;

        for (const otherRange of ranges) {
            if (range === otherRange) {
                continue;
            }

            const [start, end] = range;
            const [otherStart, otherEnd] = otherRange;

            if (start <= otherEnd && end >= otherStart) {
                newRanges.push([Math.min(start, otherStart), Math.max(end, otherEnd)]);
                added = true;
                break;
            }
        }

        if (!added) {
            newRanges.push(range);
        }
    }

    return newRanges.filter(
        (item, index) => newRanges.findIndex(otherItem => otherItem[0] === item[0] && otherItem[1] === item[1]) === index
    );
}

const mergeRangesCompletely = (ranges) => {
    let newRanges = ranges;
    let prevLength;

    do {
        prevLength = newRanges.length;
        newRanges = mergeRanges(newRanges);
    } while (prevLength !== newRanges.length);

    return newRanges;
}

const applyMaps = (range, map) => {
    const newRanges = [];

    const sortedMap = map.sort((a, b) => a[1] - b[1]);

    let previousEnd = range[0];

    if (range[1] < sortedMap[0][1]) {
        return [range];
    }

    for (const [destination, start, length] of sortedMap) {
        const end = start + length;

        if (previousEnd < start) {
            newRanges.push([previousEnd, start]);
        }

        if (range[0] < end && range[1] > start) {
            newRanges.push([destination - start + Math.max(start, range[0]), destination - start + Math.min(end, range[1])]);
        }

        previousEnd = end;
    }

    const lastMap = sortedMap[sortedMap.length - 1];

    if (range[1] > lastMap[1] + lastMap[2]) {
        newRanges.push([Math.max(range[0], lastMap[1] + lastMap[2]), range[1]]);
    }

    return mergeRangesCompletely(newRanges);
};

let min = null;

for (let i = 0; i < initialSeeds.length / 2; i++) {
    let ranges = [[initialSeeds[i * 2], initialSeeds[i * 2] + initialSeeds[i * 2 + 1]]];

    for (const map of maps) {
        const newRanges = [];

        for (const range of ranges) {
            newRanges.push(...applyMaps(range, map));
        }

        ranges = mergeRangesCompletely(newRanges);
    }

    let minVal = ranges[0][0];

    for (const finalRange of ranges) {
        minVal = Math.min(minVal, finalRange[0]);
    }

    if (min === null) {
        min = minVal;
    }

    min = Math.min(min, minVal);
}

console.log(min);

