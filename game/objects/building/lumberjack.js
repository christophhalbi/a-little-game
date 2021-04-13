
import Building from '../building.js';

export default class Lumberjack extends Building {

    static timeToBuild = 20000;

    static costs = new Map([
        ['Wood', 100],
        ['Food', 300],
    ]);

    static producesResource = new Map([
        ['Wood', 5],
    ]);

    static producesUnits = new Map();

    static workersNeeded = 1;

    constructor(position, built) {
        super(position, built);
    }
}