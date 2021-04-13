
import Unit from './../unit.js';

export default class Soldier extends Unit {

    static timeToBuild = 5000;

    static costs = new Map([
        ['Food', 50],
        ['Iron', 50],
    ]);

    constructor(position, built) {
        super(position, built);
    }
}