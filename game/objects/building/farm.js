
import Building from '../building.js';

export default class Farm extends Building {

    static timeToBuild = 15000;

    static costs = new Map([
        ['Wood', 200],
        ['Food', 100],
    ]);

    static produces = new Map([
        ['Food', 5],
    ]);

    constructor(position, built) {
        super(position, built);
    }
}