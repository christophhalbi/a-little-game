
import Building from '../building.js';
import Food from '../resource/food.js';
import Wood from '../resource/wood.js';

export default class Farm extends Building {

    static timeToBuild = 15000;

    static costs = new Map([
        [Wood, 200],
        [Food, 100],
    ]);

    static producesResource = new Map([
        [Food, 5],
    ]);

    static producesUnits = new Map();

    static workersNeeded = 1;

    constructor(position, buildTime, units, id) {
        super(position, buildTime, units, id);
    }

    static createFromJSON(json) {
        return new Farm(json._position, json._buildTime, json._units, json._id);
    }
}