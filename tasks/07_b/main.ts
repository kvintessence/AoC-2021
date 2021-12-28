import { data } from "./input";

function getFuelCost(x: number): number {
    return data
        .map(v => Math.abs(x - v)) // distance
        .map(v => v * (v + 1) / 2) // new metric
        .reduce((sum, v) => sum + v, 0); // sum
}

var min = Math.min(...data);
var max = Math.max(...data);

var bestX = max;
var bestMetric = getFuelCost(max);

for (var x = min; x < max; ++x) {
    var metric = getFuelCost(x);

    if (metric < bestMetric) {
        bestMetric = metric;
        bestX = x;
    }
}

console.log(bestX, bestMetric);
