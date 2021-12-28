
// import { testData5 as data } from "./input";
import { data as data } from "./input";

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

type PacketType = "Literal" | "Operator";

interface PacketBase {
    version: number,
    typeNumber: number,
    type: PacketType,
}

interface PacketLiteral extends PacketBase {
    typeNumber: 4,
    type: "Literal",
    value: number,
}

interface PacketOperator extends PacketBase {
    type: "Operator",
    packets: Packet[],
}

type Packet = PacketLiteral | PacketOperator;

/*****************************************************************************************************/

function toBitsString(hexString: string): string {
    const mapping: Record<string, string> = {
        "0": "0000",
        "1": "0001",
        "2": "0010",
        "3": "0011",
        "4": "0100",
        "5": "0101",
        "6": "0110",
        "7": "0111",
        "8": "1000",
        "9": "1001",
        "A": "1010",
        "B": "1011",
        "C": "1100",
        "D": "1101",
        "E": "1110",
        "F": "1111",
    };

    return [...hexString].map(v => mapping[v]).join("");
}

function parseLiteralValue(bits: string): [number, string] {
    var offset = 0;
    var numberBits = "";

    while (true) {
        var piece = bits.slice(offset, offset + 5);
        numberBits += piece.slice(1);
        offset += 5;

        if (piece[0] === "0")
            break;
    }

    const value = parseInt(numberBits, 2);
    return [value, bits.slice(offset)];
}

function parseOperatorPackets(bits: string): [Packet[], string] {
    return (bits[0] === "0") ? parseOperatorPackets0(bits) : parseOperatorPackets1(bits);
}

function parseOperatorPackets0(bits: string): [Packet[], string] {
    var subPacketsBitsLength = parseInt(bits.slice(1, 16), 2);
    bits = bits.slice(16);  // remove first bits

    var leftoverBits = bits;
    var packets: Packet[] = [];

    while ((bits.length - leftoverBits.length) < subPacketsBitsLength) {
        var [packet, cutBits] = parsePacket(leftoverBits);
        packets.push(packet);
        leftoverBits = cutBits;
    }

    return [packets, leftoverBits];
}

function parseOperatorPackets1(bits: string): [Packet[], string] {
    var packets: Packet[] = [];
    var subPacketsCount = parseInt(bits.slice(1, 12), 2);
    bits = bits.slice(12);  // remove first bits

    for (var i = 0; i < subPacketsCount; ++i) {
        var [packet, leftoverBits] = parsePacket(bits);
        packets.push(packet);
        bits = leftoverBits;
    }

    return [packets, bits];
}

function parsePacket(bits: string): [Packet, string] {
    var version = parseInt(bits.slice(0, 3), 2);
    var type = parseInt(bits.slice(3, 6), 2);

    if (type === 4) {
        var [value, leftover] = parseLiteralValue(bits.slice(6));
        return [{
            version: version,
            typeNumber: type,
            type: "Literal",
            value: value,
        }, leftover];
    } else {
        var [packets, leftover] = parseOperatorPackets(bits.slice(6));
        return [{
            version: version,
            typeNumber: type,
            type: "Operator",
            packets: packets,
        }, leftover];
    }
}

function sumPacketVersions(packet: Packet): number {
    if (packet.type === "Literal")
        return packet.version;

    return packet.version + packet.packets.map(p => sumPacketVersions(p)).reduce((a, b) => a + b, 0);
}

function calculatePacketValue(packet: Packet): number {
    if (packet.type === "Literal")
        return packet.value;

    var values = packet.packets.map(p => calculatePacketValue(p));

    switch (packet.typeNumber) {
        case 0: return values.reduce((a, b) => a + b, 0);
        case 1: return values.reduce((a, b) => a * b, 1);
        case 2: return values.reduce((a, b) => Math.min(a, b), values[0]);
        case 3: return values.reduce((a, b) => Math.max(a, b), values[0]);
        case 5: return values[0] > values[1] ? 1 : 0;
        case 6: return values[0] < values[1] ? 1 : 0;
        case 7: return values[0] === values[1] ? 1 : 0;

        default:
            break;
    }

    return packet.version + packet.packets.map(p => sumPacketVersions(p)).reduce((a, b) => a + b, 0);
}

function solveA() {
    var bits = toBitsString(data);
    var [packet, _] = parsePacket(bits);
    console.log(`A: ${sumPacketVersions(packet)}`);
}

function solveB() {
    var bits = toBitsString(data);
    var [packet, _] = parsePacket(bits);
    console.log(`B: ${calculatePacketValue(packet)}`);
}

solveA();
solveB();
