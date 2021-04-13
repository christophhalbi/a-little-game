
import Unit from './../unit.js';

export default class Worker extends Unit {

    static timeToBuild = 5000;

    static costs = new Map([
        ['Food', 50],
    ]);

    constructor(position, built) {
        super(position, built);
    }
}