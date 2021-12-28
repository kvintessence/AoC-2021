import { data } from "./input";

function getFishCount(input: number[], steps: number): number {
    var fish = new Array(9).fill(0);

    for (var f of input)
        fish[f] += 1;

    for (var step = 0; step < steps; ++step) {
        var newFishes = fish[0];

        for (var i = 0; i < 8; ++i)
            fish[i] = fish[i + 1];

        fish[6] += newFishes;
        fish[8] = newFishes;
    }

    return fish.reduce((a, b) => a + b, 0);
}

console.log(getFishCount(data, 80));
console.log(getFishCount(data, 256));
