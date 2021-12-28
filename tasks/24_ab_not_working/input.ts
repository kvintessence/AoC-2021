
import { Operation } from './main';

export const data: Operation[] = [
    { op: "inp", a: "w" },
    { op: "eql", a: "x", b: 0 }, // x = 1
    { op: "add", a: "y", b: 25 }, // x = 1, y = 25
    { op: "add", a: "y", b: 1 }, // x = 1, y = 26
    { op: "mul", a: "y", b: 0 }, // x = 1, y = 0
    { op: "add", a: "y", b: "w" }, // x = 1, y = [1..9]
    { op: "add", a: "y", b: 10 }, // x = 1, y = [11..19]
    { op: "add", a: "z", b: "y" }, // x = 1, y = [11..19], z = [11..19]

    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 }, // x = 0, y = [11..19], z = [11..19]
    { op: "add", a: "x", b: "z" },// x = [11..19], y = [11..19], z = [11..19]
    { op: "mod", a: "x", b: 26 }, // x = [11..19], y = [11..19], z = [11..19]
    { op: "add", a: "x", b: 13 }, // x = [24..32], y = [11..19], z = [11..19]
    { op: "eql", a: "x", b: "w" }, // x = 0, y = [11..19], z = [11..19]
    { op: "eql", a: "x", b: 0 },  // x = 1, y = [11..19], z = 10 + C1
    { op: "mul", a: "y", b: 0 },  // x = 1, y = 0, z = [11..19]
    { op: "add", a: "y", b: 25 }, // x = 1, y = 25, z = [11..19]
    { op: "add", a: "y", b: 1 }, // x = 1, y = 26, z = [11..19]
    { op: "mul", a: "z", b: "y" }, // x = 1, y = 26, z = [11*26..19*26]
    { op: "mul", a: "y", b: 0 },   // x = 1, y = 0, z = 26 * (10 + C1)
    { op: "add", a: "y", b: "w" }, // x = 1, y = [1..9], z = [11*26..19*26]
    { op: "add", a: "y", b: 5 },   // x = 1, y = [6..14], z = [11*26..19*26]
    { op: "add", a: "z", b: "y" }, // x = 1, y = [6..14], z = 26 * (10 + C1) + C2 + 5

    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },  // x = 0, y = [6..14], z = [11*26+6..19*26+14]
    { op: "add", a: "x", b: "z" },// x = [11*26+6..19*26+14], y = [6..14], z = [11*26+6..19*26+14]
    { op: "mod", a: "x", b: 26 }, // x = [6..14], y = [6..14], z = [11*26+6..19*26+14]
    { op: "add", a: "x", b: 15 },
    { op: "eql", a: "x", b: "w" },// x = 0, y = [6..14], z = [11*26+6..19*26+14]
    { op: "eql", a: "x", b: 0 },  // x = 1, y = [6..14], z = [11*26+6..19*26+14]
    { op: "mul", a: "y", b: 0 },  // x = 1, y = 0, z = 26 * (10 + C1) + C2 + 5
    { op: "add", a: "y", b: 26 }, // x = 1, y = 26, z = 26 * (10 + C1) + C2 + 5
    { op: "mul", a: "z", b: "y" },// x = 1, y = 26, z = 26 * (26 * (10 + C1) + C2 + 5)
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },// x = 1, y = C3+12, z = 26 * (26 * (10 + C1) + C2 + 5)
    { op: "add", a: "y", b: 12 },
    { op: "add", a: "z", b: "y" },// x = 1, y = C3+12, z = 26 * (26 * (10 + C1) + C2 + 5) + C3 + 12

    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },// x = C3 + 12
    { op: "div", a: "z", b: 26 },// z = 26 * (10 + C1) + C2 + 5
    { op: "add", a: "x", b: -12 },// x = C3
    { op: "eql", a: "x", b: "w" },// x = C3==C4 ? 1 : 0
    { op: "eql", a: "x", b: 0 },// x = C3==C4 ? 0 : 1
    { op: "mul", a: "y", b: 0 },//y = 0
    { op: "add", a: "y", b: 25 },//y = 25
    { op: "mul", a: "y", b: "x" },//y = C3==C4 ? 0 : 25
    { op: "add", a: "y", b: 1 },//y = C3==C4 ? 1 : 26
    { op: "mul", a: "z", b: "y" },//z = (26 * (10 + C1) + C2 + 5) * (C3==C4 ? 1 : 26)
    { op: "mul", a: "y", b: 0 },//y = 0
    { op: "add", a: "y", b: "w" },// y = C4
    { op: "add", a: "y", b: 12 },// y = C4 + 12
    { op: "mul", a: "y", b: "x" },// y = (C4 + 12) * (C3==C4 ? 0 : 1)
    { op: "add", a: "z", b: "y" },//z = (26 * (10 + C1) + C2 + 5) * (C3==C4 ? 1 : 26) + (C4 + 12) * (C3==C4 ? 0 : 1)

    //z = C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)

    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },//x=0
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },//x = C3==C4 ? (C2 + 5) : (C4 + 12)
    { op: "add", a: "x", b: 14 },
    { op: "eql", a: "x", b: "w" },//x=0
    { op: "eql", a: "x", b: 0 },//x=1
    { op: "mul", a: "y", b: 0 },//y=0
    { op: "add", a: "y", b: 25 },//y=25
    { op: "add", a: "y", b: 1 },//y=26
    { op: "mul", a: "z", b: "y" },//z = 26 * (C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12))
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },//y=C5
    { op: "add", a: "y", b: 6 },//y=C5+6
    { op: "add", a: "z", b: "y" },//z = 26 * (C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)) + C5 + 6

    { op: "inp", a: "w" }, // C6
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 }, //x = C5 + 6
    { op: "div", a: "z", b: 26 }, //z = C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)
    { op: "add", a: "x", b: -2 }, //x = C5 + 4
    { op: "eql", a: "x", b: "w" },//x = (C5 + 4==C6) ? 1 : 0
    { op: "eql", a: "x", b: 0 },  //x = (C5 + 4==C6) ? 0 : 1
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 }, //y=25
    { op: "mul", a: "y", b: "x" },//y=25 * ((C5 + 4==C6) ? 0 : 1)
    { op: "add", a: "y", b: 1 },  //y=25 * ((C5 + 4==C6) ? 0 : 1) + 1
    { op: "mul", a: "z", b: "y" },//z = (C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)) * (25 * ((C5 + 4==C6) ? 0 : 1) + 1)
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },//y=C6
    { op: "add", a: "y", b: 4 },//y=C6 + 4
    { op: "mul", a: "y", b: "x" },//y=(C6 + 4) * ((C5 + 4==C6) ? 0 : 1)
    { op: "add", a: "z", b: "y" },// z = (C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)) * (25 * ((C5 + 4==C6) ? 0 : 1) + 1) + (C6 + 4) * ((C5 + 4==C6) ? 0 : 1)

    { op: "inp", a: "w" }, // C7
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 }, // x = (C3==C4 ? (C2 + 5) : (C4 + 12)) * (25 * ((C5 + 4==C6) ? 0 : 1) + 1) + (C6 + 4) * ((C5 + 4==C6) ? 0 : 1)
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 13 },
    { op: "eql", a: "x", b: "w" },//x=0
    { op: "eql", a: "x", b: 0 },//x=1
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },//y=25
    { op: "add", a: "y", b: 1 },//y=26
    { op: "mul", a: "z", b: "y" },// z = (C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)) * (25 * ((C5 + 4==C6) ? 0 : 1) + 1) + (C6 + 4) * ((C5 + 4==C6) ? 0 : 1) * 26
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },//y=C7
    { op: "add", a: "y", b: 15 },//y=C7+15
    { op: "add", a: "z", b: "y" },// z = (C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)) * (25 * ((C5 + 4==C6) ? 0 : 1) + 1) + (C6 + 4) * ((C5 + 4==C6) ? 0 : 1) * 26 + C7 + 15

    { op: "inp", a: "w" }, // C8
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },  // x = C7 + 15
    { op: "div", a: "z", b: 26 },  // z = (C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)) * (25 * ((C5 + 4==C6) ? 0 : 1) + 1) + (C6 + 4) * ((C5 + 4==C6) ? 0 : 1)
    { op: "add", a: "x", b: -12 }, // x = C7 + 3
    { op: "eql", a: "x", b: "w" }, // x = (C7 + 3==C8 ? 1 : 0)
    { op: "eql", a: "x", b: 0 },   // x = (C7 + 3==C8 ? 0 : 1)
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },//y=25
    { op: "mul", a: "y", b: "x" }, //y = 25 * (C7 + 3==C8 ? 0 : 1) + 1
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" }, // z = (C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)) * (25 * ((C5 + 4==C6) ? 0 : 1) + 1) + (C6 + 4) * ((C5 + 4==C6) ? 0 : 1) * (25 * (C7 + 3==C8 ? 0 : 1) + 1)
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 3 }, // y = C8 + 3
    { op: "mul", a: "y", b: "x" },// y = (C8 + 3) * (C7 + 3==C8 ? 0 : 1)
    { op: "add", a: "z", b: "y" },// ZZZ = (C3==C4 ? (26 * (10 + C1) + C2 + 5) : ((26 * (10 + C1) + C2 + 5) * 26 + C4 + 12)) * (25 * ((C5 + 4==C6) ? 0 : 1) + 1) + (C6 + 4) * ((C5 + 4==C6) ? 0 : 1) * (25 * (C7 + 3==C8 ? 0 : 1) + 1) + (C8 + 3) * (C7 + 3==C8 ? 0 : 1)

    { op: "inp", a: "w" }, // C9
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 15 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },//x=1
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },//y=26
    { op: "mul", a: "z", b: "y" },//z = z*26
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 7 },//y=C9+7
    { op: "add", a: "z", b: "y" },//z = z * 26 + C9 + 7

    { op: "inp", a: "w" },//C10
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 11 },
    { op: "eql", a: "x", b: "w" },//x=0
    { op: "eql", a: "x", b: 0 },//x=1
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "add", a: "y", b: 1 },//y=26
    { op: "mul", a: "z", b: "y" },//z = (z * 26 + C9 + 7) * 26
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 11 },//y = C10 + 11
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" }, // z = (z * 26 + C9 + 7) * 26 + C10 + 11

    { op: "inp", a: "w" },//C11
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },//x = C10 + 11
    { op: "div", a: "z", b: 26 },// z = ZZZ * 26 + C9 + 7
    { op: "add", a: "x", b: -3 },//x = C10 + 8
    { op: "eql", a: "x", b: "w" },//x = (C10 + 8 == C11) ? 1 : 0
    { op: "eql", a: "x", b: 0 },//x = (C10 + 8 == C11) ? 0 : 1
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },// y = 25 * ((C10 + 8 == C11) ? 0 : 1)
    { op: "add", a: "y", b: 1 },// y = 25 * ((C10 + 8 == C11) ? 0 : 1) + 1
    { op: "mul", a: "z", b: "y" },// z = (ZZZ * 26 + C9 + 7) * (25 * ((C10 + 8 == C11) ? 0 : 1) + 1)
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 2 },//y = C11 + 2
    { op: "mul", a: "y", b: "x" },//y = (C11 + 2) * ((C10 + 8 == C11) ? 0 : 1)
    { op: "add", a: "z", b: "y" },// z = (ZZZ * 26 + C9 + 7) * (25 * ((C10 + 8 == C11) ? 0 : 1) + 1) + (C11 + 2) * ((C10 + 8 == C11) ? 0 : 1)

    // z = (C10 + 8 == C11) ?
    // (ZZZ * 26 + C9 + 7)
    // (ZZZ * 26 + C9 + 7) * 26 + (C11 + 2)

    { op: "inp", a: "w" }, //C12
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "div", a: "z", b: 26 },
    // z = (C10 + 8 == C11) ?
    // (ZZZ)
    // (ZZZ * 26 + C9 + 7)
    { op: "mod", a: "x", b: 26 },
    { op: "add", a: "x", b: -13 },
    // z = (C10 + 8 == C11) ?
    // (C9 - 6)
    // (C11 - 11)
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 12 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },

    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 26 },
    { op: "add", a: "x", b: -12 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 4 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },

    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 26 },
    { op: "add", a: "x", b: -13 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 11 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
];














export const dataOriginal = [
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 10 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 10 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 13 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 5 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 15 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 12 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 26 },
    { op: "add", a: "x", b: -12 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 12 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 14 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 6 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 26 },
    { op: "add", a: "x", b: -2 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 4 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 13 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 15 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 26 },
    { op: "add", a: "x", b: -12 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 3 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 15 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 7 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 1 },
    { op: "add", a: "x", b: 11 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 11 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 26 },
    { op: "add", a: "x", b: -3 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 2 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 26 },
    { op: "add", a: "x", b: -13 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 12 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },
    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },
    { op: "add", a: "x", b: "z" },
    { op: "mod", a: "x", b: 26 },
    { op: "div", a: "z", b: 26 },
    { op: "add", a: "x", b: -12 },
    { op: "eql", a: "x", b: "w" },
    { op: "eql", a: "x", b: 0 },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: 25 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "y", b: 1 },
    { op: "mul", a: "z", b: "y" },
    { op: "mul", a: "y", b: 0 },
    { op: "add", a: "y", b: "w" },
    { op: "add", a: "y", b: 4 },
    { op: "mul", a: "y", b: "x" },
    { op: "add", a: "z", b: "y" },

    { op: "inp", a: "w" },
    { op: "mul", a: "x", b: 0 },   // x = 0
    { op: "add", a: "x", b: "z" }, // x = z
    { op: "mod", a: "x", b: 26 },  // x = z % 26
    { op: "div", a: "z", b: 26 },  // z = z / 26
    { op: "add", a: "x", b: -13 }, // x = z % 26 - 13
    { op: "eql", a: "x", b: "w" }, // x = (z % 26 - 13 == W) ? 1 : 0
    { op: "eql", a: "x", b: 0 },   // x = (z % 26 - 13 == W) ? 0 : 1
    { op: "mul", a: "y", b: 0 },   // y = 0
    { op: "add", a: "y", b: 25 },  // y = 25
    { op: "mul", a: "y", b: "x" }, // y = 25 * ((z % 26 - 13 == W) ? 0 : 1)
    { op: "add", a: "y", b: 1 },   // y = 25 * ((z % 26 - 13 == W) ? 0 : 1) + 1
    { op: "mul", a: "z", b: "y" }, // z = z / 26 * (25 * ((z % 26 - 13 == W) ? 0 : 1) + 1)
    { op: "mul", a: "y", b: 0 },   // y = 0
    { op: "add", a: "y", b: "w" }, // y = w
    { op: "add", a: "y", b: 11 },  // y = w + 11
    { op: "mul", a: "y", b: "x" }, // y = (w + 11) * ((z % 26 - 13 == W) ? 0 : 1)
    { op: "add", a: "z", b: "y" }, // z = z / 26 * (25 * ((z % 26 - 13 == W) ? 0 : 1) + 1) + (w + 11) * ((z % 26 - 13 == W) ? 0 : 1)
];
