
import ResourceWood from './objects/resource/wood.js';
import ResourceFood from './objects/resource/food.js';
import ResourceIron from './objects/resource/iron.js';
import Unit from './objects/unit.js';
import GameMap from './data/map.js';

export default class GameData {

    _resources = [];
    _buildings = [];
    _units     = [];

    constructor() {

    }

    init() {
        this._resources.push(new ResourceWood(200, 5));
        this._resources.push(new ResourceFood(300, 10));
        this._resources.push(new ResourceIron(0, 0));

        this._map = new GameMap(25, 25);

        this._units.push(new Unit(this._map.square(5, 5)));

        let runInterval = this.runInterval.bind(this);

        setInterval(runInterval, 5000);
    }

    runInterval() {
        console.log('interval run');

        this._resources.forEach(resource => resource.raiseStock());
    }

}