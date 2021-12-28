import { data } from "./input";

var x = 0;
var y = 0;

for (let index = 1; index < data.length; index++) {
    const [command, valueString] = data[index].split(' ');
    const value = parseInt(valueString);

    switch (command) {
        case 'forward':
            x += value;
            break;

        case 'up':
            y -= value;
            break;

        case 'down':
            x += value;
            break;

        default:
            break;
    }
}

console.log(x, y);
console.log(x * y);
