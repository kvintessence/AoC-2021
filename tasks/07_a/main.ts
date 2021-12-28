import { data } from "./input";

function getFuelCost(x: number): number {
    return data.map(v => Math.abs(x - v)).reduce((a, b) => a + b, 0);
}

data.sort((a, b) => a - b);

var mediumIndex = Math.round(data.length / 2.0);

var result = Math.min(
    getFuelCost(data[mediumIndex - 1]),
    getFuelCost(data[mediumIndex]),
    getFuelCost(data[mediumIndex + 1]),
);
console.log(result);
