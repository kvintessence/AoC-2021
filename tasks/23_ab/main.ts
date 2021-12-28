
import { data1, data2, testData1, testData2 } from "./input";

/*****************************************************************************************************/

export function deepObjectCopy<T = any>(src: T): T {
    return JSON.parse(JSON.stringify(src)) as T;
}

export function getUniqueListBy<T, F>(array: T[], keyFunc: (value: T) => F) {
    return [...new Map(array.map(item => [keyFunc(item), item])).values()];
}

export function mirrorMatrix<T, F>(data: T[][], defaultValue: F): F[][] {
    var result: F[][] = new Array<F[]>(data.length);
    for (var i = 0; i < data.length; ++i)
        result[i] = new Array<F>(data[i].length).fill(defaultValue);
    return result;
}

/*****************************************************************************************************/

export type Animal = 'A' | 'B' | 'C' | 'D' | ' ';

interface Hole {
    x: number,
    stack: Animal[],
    requires: Animal,
    depth: number,
}

interface Place {
    x: number,
    who: Animal,
}

interface World {
    holes: Hole[],
    places: Place[],
    score: number,
    nextWorlds: Record<string, World>,
    previous?: World,
}

function createWorld(data: typeof data1): World {
    var world: World = {
        holes: [],
        places: [],
        score: 0,
        nextWorlds: {},
    };

    world.holes.push({ x: 2, stack: data.holes[0], requires: 'A', depth: data.depth });
    world.holes.push({ x: 4, stack: data.holes[1], requires: 'B', depth: data.depth });
    world.holes.push({ x: 6, stack: data.holes[2], requires: 'C', depth: data.depth });
    world.holes.push({ x: 8, stack: data.holes[3], requires: 'D', depth: data.depth });

    world.places.push({ x: 0, who: ' ' });
    world.places.push({ x: 1, who: ' ' });
    world.places.push({ x: 3, who: ' ' });
    world.places.push({ x: 5, who: ' ' });
    world.places.push({ x: 7, who: ' ' });
    world.places.push({ x: 9, who: ' ' });
    world.places.push({ x: 10, who: ' ' });

    return world;
}

function getCost(animal: Animal): number {
    switch (animal) {
        case "A": return 1;
        case "B": return 10;
        case "C": return 100;
        case "D": return 1000;
        default: break;
    }

    return 10000000;
}

function isWorldSolved(world: World): boolean {
    for (var place of world.places)
        if (place.who !== " ")
            return false;

    for (var hole of world.holes) {
        if (hole.stack.length !== hole.depth)
            return false;

        for (var animal of hole.stack)
            if (animal !== hole.requires)
                return false;
    }

    return true;
}

function isPathClear(world: World, x1: number, x2: number): boolean {
    var minX = Math.min(x1, x2);
    var maxX = Math.max(x1, x2);

    for (var place of world.places)
        if (minX < place.x && place.x < maxX && place.who !== " ")
            return false;

    return true;
}

function tryToMoveFromPlaceToHole(p: number, h: number, world: World): World | undefined {
    var hole = world.holes[h];
    var place = world.places[p];

    if (hole.stack.length >= hole.depth)
        return undefined;

    if (hole.requires !== place.who)
        return undefined;

    if (hole.stack.some(v => v !== place.who))
        return undefined;  // some animals do not belong here, need to get them out first

    if (!isPathClear(world, hole.x, place.x))
        return undefined;

    var previous = world.previous;
    var nextWorlds = world.nextWorlds;
    world.nextWorlds = {};
    world.previous = undefined;

    var newWorld = deepObjectCopy(world);
    newWorld.previous = world;

    world.nextWorlds = nextWorlds;
    world.previous = previous;

    var animal = place.who;
    newWorld.score += (Math.abs(hole.x - place.x) + (hole.depth - newWorld.holes[h].stack.length)) * getCost(animal);
    newWorld.holes[h].stack.push(animal);
    newWorld.places[p].who = ' ';
    return newWorld;
}

function tryToMoveFromHoleToPlace(h: number, p: number, world: World): World | undefined {
    var hole = world.holes[h];
    var place = world.places[p];

    if (hole.stack.length === 0)
        return undefined;  // no one here

    if (hole.stack.every(v => v === hole.requires))
        return undefined;  // all animals do belong here, no need to get them out

    if (!isPathClear(world, hole.x, place.x))
        return undefined;

    var previous = world.previous;
    var nextWorlds = world.nextWorlds;
    world.nextWorlds = {};
    world.previous = undefined;

    var newWorld = deepObjectCopy(world);
    newWorld.previous = world;

    world.nextWorlds = nextWorlds;
    world.previous = previous;

    var animal = hole.stack[hole.stack.length - 1];
    newWorld.score += (Math.abs(hole.x - place.x) + (hole.depth - newWorld.holes[h].stack.length) + 1) * getCost(animal);
    newWorld.places[p].who = animal;
    newWorld.holes[h].stack.pop();
    return newWorld;
}

function toString(world: World): string {
    return world.places.map(v => v.who).join("") +
        world.holes.map(h => h.stack.join("") + `${h.stack.length}`).join("");
}

function printWorld(world: World): void {
    console.log(`score: ${world.score}` + (world.previous ? ` (+${world.score - (world.previous?.score || 0)})` : ""));
    console.log("#############");

    var places = "";
    for (var i = 0; i <= 10; ++i) {
        var found = false;

        for (var place of world.places) {
            if (place.x === i) {
                places += place.who;
                found = true;
                break;
            }
        }

        if (!found)
            places += " ";
    }
    console.log("#" + places + "#");

    for (var i = 0; i < world.holes[0].depth; ++i) {
        var left = i === 0 ? "###" : "  #";
        var right = i === 0 ? "###" : "#  ";
        var j = world.holes[0].depth - i - 1;
        var center = world.holes.map(v => v.stack.length > j ? v.stack[j] : " ").join("#");
        console.log(left + center + right);
    }
    console.log("  #########  ");
}

export function printWorldPath(world: World): void {
    if (world.previous)
        printWorldPath(world.previous);

    console.log("");
    printWorld(world);
}

function solve(data: typeof data1, msg: string) {
    var worlds: World[] = [createWorld(data)];
    var scores: number[] = [];

    var stats = {
        sameBetter: 0,
        sameWorse: 0,
        brandNew: 0,
        processed: 0,
        rec: 0,
    };
    var worldsProcessed: Record<string, World> = {};

    function reduceScoreRecursive(world: World, diff: number) {
        world.score -= diff;
        stats.rec += 1;

        for (var i in world.nextWorlds)
            reduceScoreRecursive(world.nextWorlds[i], diff);
    }

    function maybeAddNewWorld(oldWorld: World, newWorld: World | undefined): void {
        if (newWorld === undefined)
            return;

        var newWorldString = toString(newWorld);
        var existingNewWorld = worldsProcessed[newWorldString];

        stats.processed += 1;

        if (existingNewWorld !== undefined) {
            oldWorld.nextWorlds[newWorldString] = existingNewWorld;

            if (existingNewWorld.score <= newWorld.score) {
                stats.sameWorse += 1;
                return;  // already found this state, but with better score
            }

            // console.log("found the same world but with better score, updating it...");
            stats.sameBetter += 1;
            existingNewWorld.previous = oldWorld;
            var scoreDiff = existingNewWorld.score - newWorld.score;
            reduceScoreRecursive(existingNewWorld, scoreDiff);
            return;
        }

        stats.brandNew += 1;
        oldWorld.nextWorlds[newWorldString] = newWorld;
        worldsProcessed[newWorldString] = newWorld;
        worlds.push(newWorld);
    }

    function cutWorldLeastScore(): World {
        var bestI = 0;
        var w = worlds[0];

        for (var i = 1; i < worlds.length; ++i) {
            if (w.score > worlds[i].score) {
                w = worlds[i];
                bestI = i;
            }
        }

        worlds.splice(bestI, 1);
        return w;
    }

    while (worlds.length > 0) {
        //worlds.forEach(w => printWorld(w));
        //console.log(`world: ${worlds.length}`);
        // worlds.sort((a, b) => b.score - a.score);

        //var world = worlds.pop();
        var world = cutWorldLeastScore();

        if (world === undefined)
            break;

        if (isWorldSolved(world)) {
            scores.push(world.score);
            // printWorldPath(world);
            continue;
        }

        for (var p = 0; p < world.places.length; ++p) {
            if (world.places[p].who === " ")
                continue;

            for (var h = 0; h < world.holes.length; ++h) {
                var newWorld = tryToMoveFromPlaceToHole(p, h, world);
                maybeAddNewWorld(world, newWorld);
            }
        }

        for (var h = 0; h < world.holes.length; ++h) {
            for (var p = 0; p < world.places.length; ++p) {
                if (world.places[p].who !== " ")
                    continue;

                var newWorld = tryToMoveFromHoleToPlace(h, p, world);
                maybeAddNewWorld(world, newWorld);
            }
        }
    }

    var minScore = Math.min(...scores);
    console.log(`${msg}: stats = ${JSON.stringify(stats)}`);
    console.log(`${msg}: ${JSON.stringify(scores)}`);
    console.log(`${msg}: ${minScore}`);
}

function run() {
    solve(data2, "     B");
    return;
    solve(data1, "     A");
    solve(testData1, "test A");
    solve(testData2, "test B");
}

run();
