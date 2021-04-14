
import Food from '../resource/food.js';
import Iron from '../resource/iron.js';
import Unit from './../unit.js';

export default class Soldier extends Unit {

    static timeToBuild = 5000;

    static costs = new Map([
        [Food, 50],
        [Iron, 50],
    ]);

    constructor(position, buildTime, id) {
        super(position, buildTime, id);
    }

    static createFromJSON(json) {
        return new Soldier(json._position, json._buildTime, json._id);
    }
}