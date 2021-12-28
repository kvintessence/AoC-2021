import { data } from "./input";

var x = 0;
var depth = 0;
var aim = 0;

for (let index = 0; index < data.length; index++) {
    const [command, valueString] = data[index].split(' ');
    const value = parseInt(valueString);

    switch (command) {
        case 'forward':
            x += value;
            depth += aim * value;
            break;

        case 'up':
            aim -= value;
            break;

        case 'down':
            aim += value;
            break;

        default:
            break;
    }
}

console.log(x, depth);
console.log(x * depth);
