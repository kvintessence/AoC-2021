
import { data } from "./input";

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

const registries = ['x', 'y', 'z', 'w'] as const;
type Registry = typeof registries[number];

interface State {
    r: Record<Registry, number>,
    values: number[][],
}

export type Operation = {
    op: 'inp',
    a: Registry,
} | {
    op: 'add' | 'mul' | 'div' | 'mod' | 'eql',
    a: Registry,
    b: Registry | number,
};

function toString(state: State): string {
    return `${state.r.x},${state.r.y},${state.r.z},${state.r.w}`;
}

function injectValues(original: State, toInject: State) {
    var lastA = original.values[original.values.length - 1];
    var lastB = toInject.values[toInject.values.length - 1];
    var sum = new Set([...lastA, ...lastB]);
    original.values[original.values.length - 1] = [...sum];
}

function solve(instructions: Operation[], msg: string) {
    var originalState: State = {
        r: { x: 0, y: 0, z: 0, w: 0 },
        values: [],
    };
    var statesToProcess: Record<string, State> = {};
    statesToProcess[toString(originalState)] = originalState;

    for (var instruction of instructions) {
        var newStates: Record<string, State> = {};
        var stats = { merged: 0, brandNew: 0 };

        if (instruction.op === "inp")
            console.log("");

        console.log(`instruction: ${JSON.stringify(instruction)}, states count: ${Object.values(statesToProcess).length}`);

        for (var stateIndex in statesToProcess) {
            var oldState = statesToProcess[stateIndex];

            if (instruction.op === "inp") {
                for (var i = 1; i < 10; ++i) {
                    var newState = deepObjectCopy(oldState);
                    newState.values.push([i]);
                    newState.r[instruction.a] = i;


                    var newStateString = toString(newState);
                    var existingNewState = newStates[newStateString];

                    if (existingNewState === undefined) {
                        newStates[newStateString] = newState;
                        stats.brandNew += 1;
                    } else {
                        injectValues(existingNewState, newState);
                        stats.merged += 1;
                    }
                }
            } else {
                var newState = deepObjectCopy(oldState);
                var otherValue = (typeof instruction.b === "number") ? instruction.b : newState.r[instruction.b];

                if (instruction.op === "add") {
                    newState.r[instruction.a] += otherValue;
                } else if (instruction.op === "mul") {
                    newState.r[instruction.a] *= otherValue;
                } else if (instruction.op === "eql") {
                    newState.r[instruction.a] = (newState.r[instruction.a] === otherValue) ? 1 : 0;
                } else if (instruction.op === "mod") {
                    newState.r[instruction.a] %= otherValue;
                } else if (instruction.op === "div") {
                    newState.r[instruction.a] = Math.floor(newState.r[instruction.a] / otherValue);
                }

                var newStateString = toString(newState);
                var existingNewState = newStates[newStateString];

                if (existingNewState === undefined) {
                    newStates[newStateString] = newState;
                    stats.brandNew += 1;
                } else {
                    injectValues(existingNewState, newState);
                    stats.merged += 1;
                }
            }
        }

        statesToProcess = newStates;

        if (stats.merged > 0)
            console.log(`stats: ${JSON.stringify(stats)}`);
    }

    var max = 0;
    var count = 0;
    var total = 0;
    var minZ = 99999999999;

    for (var index in statesToProcess) {
        total += 1;

        var state = statesToProcess[index];
        minZ = Math.min(minZ, state.r.z);
        if (state.r.z !== 0)
            continue;

        count += 1;
        var value = parseInt(state.values.map(v => Math.max(...v)).join(""));
        if (value > max)
            max = value;
    }

    console.log(`${msg}: count = ${count}/${total}, max = ${max}, min z = ${minZ}`);
}

function run() {
    solve(data, "A");
}

run();
