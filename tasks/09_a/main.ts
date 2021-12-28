import { data } from "./input";

function parseData(data: string[]): number[][] {
    return data.map(v => [...v].map(n => parseInt(n)));
}

function findRiskLevel(data: number[][]): number {
    var maxI = data.length - 1;
    var maxJ = data[0].length - 1;
    var result = 0;

    for (var i = 0; i <= maxI; ++i) {
        for (var j = 0; j <= maxJ; ++j) {
            var lowest = true;
            var height = data[i][j];

            if (i > 0 && data[i - 1][j] <= height)
                lowest = false;

            if (j > 0 && data[i][j - 1] <= height)
                lowest = false;

            if (i < maxI && data[i + 1][j] <= height)
                lowest = false;

            if (j < maxJ && data[i][j + 1] <= height)
                lowest = false;

            if (lowest)
                result += 1 + height;
        }
    }

    return result;
}

var heightMap = parseData(data);
console.log(findRiskLevel(heightMap));
