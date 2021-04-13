
import Building from '../building.js';

export default class Farm extends Building {

    static timeToBuild = 15000;

    static costs = new Map([
        ['Wood', 200],
        ['Food', 100],
    ]);

    static producesResource = new Map([
        ['Food', 5],
    ]);

    static producesUnits = new Map();

    static workersNeeded = 1;

    constructor(position, built) {
        super(position, built);
    }
}