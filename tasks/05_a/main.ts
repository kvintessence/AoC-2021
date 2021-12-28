import { data } from "./input";

var points: { [key: string]: number } = {};

for (var line of data) {
    var [p1, p2] = line.split(" -> ");
    var [x1, y1] = p1.split(",").map(v => parseInt(v));
    var [x2, y2] = p2.split(",").map(v => parseInt(v));

    if (x1 != x2 && y1 != y2)
        continue;  // only straight lines

    var x = Math.min(x1, x2);
    var y = Math.min(y1, y2);

    var finalX = Math.max(x1, x2);
    var finalY = Math.max(y1, y2);

    while (true) {
        var key = `${x}_${y}`;
        points[key] = (points[key] ?? 0) + 1;

        if (x >= finalX && y >= finalY)
            break;

        if (x < finalX)
            x += 1;

        if (y < finalY)
            y += 1;
    }
}

var result = 0;

for (var value of Object.values(points)) {
    if (value >= 2)
        result += 1;
}

console.log(result)
