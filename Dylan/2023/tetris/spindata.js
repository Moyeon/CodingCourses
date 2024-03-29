const JLTSZ = [
    {
        clockwise: [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
        counter: [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    },{
        clockwise: [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
        counter: [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    },
    {
        clockwise: [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
        counter: [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    },{
        clockwise: [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
        counter: [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    },
];

const I_SPIN = [
    {
        clockwise: [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
        counter: [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
    },{
        clockwise: [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
        counter: [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
    },
    {
        clockwise: [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
        counter: [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
    },{
        clockwise: [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
        counter: [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
    },
];