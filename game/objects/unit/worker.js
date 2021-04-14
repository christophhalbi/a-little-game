
import Food from '../resource/food.js';
import Unit from './../unit.js';

export default class Worker extends Unit {

    static timeToBuild = 5000;

    static costs = new Map([
        [Food, 50],
    ]);

    constructor(position, buildTime, id) {
        super(position, buildTime, id);
    }

    static createFromJSON(json) {
        return new Worker(json._position, json._buildTime, json._id);
    }
}