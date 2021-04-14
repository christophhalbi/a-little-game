
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

    constructor(position, buildTime, units, id) {
        super(position, buildTime, units, id);
    }

    static createFromJSON(json) {
        return new Lumberjack(json._position, json._buildTime, json._units, json._id);
    }
}