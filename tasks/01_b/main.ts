import { data } from "./input";

var result = 0;
var previous = data.slice(0, 3);

for (let i = 1; i < data.length - 2; i++) {
    const current = data.slice(i, i + 3);
    const previousSum = previous.reduce((sum, b) => sum + b, 0);
    const currentSum = current.reduce((sum, b) => sum + b, 0);

    if (currentSum > previousSum)
        ++result;

    previous = current;
}

console.log(result);
