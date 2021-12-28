
// import { testData3 as data } from "./input";
import { data as data } from "./input";

interface BigCaveRegistry {
    [key: string]: boolean,
}

interface CavesMap {
    [from: string]: string[],
}

type CavePath = string[];

/*
function getUniqueListBy<T, F>(array: T[], keyFunc: (value: T) => F) {
    return [...new Map(array.map(item => [keyFunc(item), item])).values()];
}
*/

function createBigCaveRegistry(paths: typeof data): BigCaveRegistry {
    var result: BigCaveRegistry = {};
    const isUpperCase = (p: string) => p === p.toUpperCase();

    for (var path of paths) {
        result[path.from] = isUpperCase(path.from);
        result[path.to] = isUpperCase(path.to);
    }

    return result;
}

function createCavesMap(paths: typeof data): CavesMap {
    var result: CavesMap = {};

    for (var path of paths) {
        if (result[path.from] === undefined)
            result[path.from] = [];

        if (result[path.to] === undefined)
            result[path.to] = [];

        if (!result[path.from].includes(path.to))
            result[path.from].push(path.to);

        if (!result[path.to].includes(path.from))
            result[path.to].push(path.from);
    }

    return result;
}

function findNextPaths(
    currentPath: CavePath,
    cavesMap: CavesMap,
    bigCaveRegistry: BigCaveRegistry,
    allowDoubleVisit: boolean,
): CavePath[] {

    if (currentPath[currentPath.length - 1] === "end")
        return [currentPath];

    var result: CavePath[] = [];
    var smallCavesInPath = currentPath.filter(cave => !bigCaveRegistry[cave]);
    var smallCaveDoubleVisited = smallCavesInPath.length > new Set(smallCavesInPath).size;

    for (var nextCave of cavesMap[currentPath[currentPath.length - 1]]) {
        var isBig: boolean = bigCaveRegistry[nextCave];
        var wasVisited: boolean = currentPath.includes(nextCave);
        var isSpecial: boolean = (nextCave === "start" || nextCave === "end") && currentPath.includes(nextCave);

        if (isSpecial || (!isBig && wasVisited && (smallCaveDoubleVisited || !allowDoubleVisit)))
            continue;

        result = result.concat(findNextPaths([...currentPath, nextCave], cavesMap, bigCaveRegistry, allowDoubleVisit));
    }

    return result;
}

function findAllPaths(cavesMap: CavesMap, bigCaveRegistry: BigCaveRegistry, allowDoubleVisit: boolean): CavePath[] {
    var paths = findNextPaths(['start'], cavesMap, bigCaveRegistry, allowDoubleVisit);
    return paths;
    // return getUniqueListBy(paths, p => p.join(","));
}

function solveA() {
    var cavesMap = createCavesMap(data);
    var registry = createBigCaveRegistry(data);
    var paths = findAllPaths(cavesMap, registry, false);
    console.log(`A: ${paths.length}`);
}

function solveB() {
    var cavesMap = createCavesMap(data);
    var registry = createBigCaveRegistry(data);
    var paths = findAllPaths(cavesMap, registry, true);
    // console.log(paths.map(v => v.join(",")).join("\n"));
    console.log(`B: ${paths.length}`);
}

solveA();
solveB();
