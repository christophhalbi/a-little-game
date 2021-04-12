
import Building from '../building.js';

export default class Castle extends Building {

    static timeToBuild = 60000;

    static costs = new Map([
        ['Wood', 2000],
        ['Iron', 2000],
    ]);

    static produces = new Map();

    static workersNeeded = 10;

    constructor(position, built) {
        super(position, built);
    }
}