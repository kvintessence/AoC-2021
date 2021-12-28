import { data } from "./input";

var bits = data[0].length;
var zeroes: number[] = new Array(bits).fill(0);

for (var value of data) {
    for (var i = 0; i < value.length; ++i) {
        var digit = value[i];

        if (digit === "0")
            zeroes[i] += 1;
    }

}

var v1 = 0;
var v2 = 0;
const halfNumbers = data.length * 0.5;

for (var z of zeroes) {
    v1 *= 2;
    v2 *= 2;

    var isOne = z <= halfNumbers;

    if (isOne) {
        v1 += 1;
    } else {
        v2 += 1;
    }
}

console.log(v1, v2);
console.log(v1 * v2);
