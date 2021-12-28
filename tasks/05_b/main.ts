import { data } from "./input";

var points: { [key: string]: number } = {};

for (var line of data) {
    var [p1, p2] = line.split(" -> ");
    var [x1, y1] = p1.split(",").map(v => parseInt(v));
    var [x2, y2] = p2.split(",").map(v => parseInt(v));

    var x = x1;
    var y = y1;

    while (true) {
        var key = `${x}_${y}`;
        points[key] = (points[key] ?? 0) + 1;

        if (x === x2 && y === y2)
            break;

        if (x != x2)
            x += (x2 > x) ? 1 : -1;

        if (y != y2)
            y += (y2 > y) ? 1 : -1;
    }
}

var result = 0;

for (var value of Object.values(points)) {
    if (value >= 2)
        result += 1;
}

console.log(result)
