
import Building from '../building.js';
import Iron from '../resource/iron.js';
import Wood from '../resource/wood.js';
import Worker from "../unit/worker.js";

export default class Castle extends Building {

    static timeToBuild = 60000;

    static costs = new Map([
        [Wood, 2000],
        [Iron, 2000],
    ]);

    static producesResource = new Map();

    static producesUnits = new Map([
        [Worker, true],
    ]);

    static workersNeeded = 10;

    constructor(position, buildTime, units, id) {
        super(position, buildTime, units, id);
    }

    static createFromJSON(json) {
        return new Castle(json._position, json._buildTime, json._units, json._id);
    }
}