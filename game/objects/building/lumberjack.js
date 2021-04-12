
import Building from '../building.js';

export default class Lumberjack extends Building {

    static timeToBuild = 20000;

    static costs = new Map([
        ['Wood', 100],
        ['Food', 300],
    ]);

    static raisesResources = new Map([
        ['Wood', 5],
    ]);

    constructor(position, built) {
        super(position, built);
    }
}