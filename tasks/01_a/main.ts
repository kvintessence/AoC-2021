import { data } from "./input";

var result = 0;
var previous = data[0];

for (let index = 1; index < data.length; index++) {
    const element = data[index];

    if (element > previous)
        ++result;

    previous = element;
}

console.log(result);
