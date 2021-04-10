
import ResourceWood from './objects/resource/wood.js';
import ResourceFood from './objects/resource/food.js';
import ResourceIron from './objects/resource/iron.js';
import Unit from './objects/unit.js';
import Building from './objects/building.js';
import GameMap from './objects/map.js';

export default class GameData {

    _resources = [];
    _buildings = [];
    _units     = [];

    _movements = [];

    constructor() {

    }

    init() {
        this._resources.push(new ResourceWood(200, 5));
        this._resources.push(new ResourceFood(300, 10));
        this._resources.push(new ResourceIron(0, 0));

        this._map = new GameMap(25, 25);

        this._buildings.push(new Building('C', this._map.square(6, 5)));

        this._units.push(new Unit('S', this._map.square(5, 4)));
        this._units.push(new Unit('W', this._map.square(5, 5)));
        this._units.push(new Unit('S', this._map.square(8, 1)));
        this._units.push(new Unit('S', this._map.square(8, 2)));

        let runResourceInterval = this.runResourceInterval.bind(this);

        setInterval(runResourceInterval, 5000);

        let runMovementInterval = this.runMovementInterval.bind(this);

        setInterval(runMovementInterval, 1000);
    }

    runResourceInterval() {
        this._resources.forEach(resource => resource.raiseStock());
    }

    runMovementInterval() {
        this._movements.forEach((item, index, arr) => {
            const currentX = item[0].position.x;
            const currentY = item[0].position.y;
            const toX = item[1].x;
            const toY = item[1].y;

            if (currentX === toX && currentY == toY) {
                arr.splice(index, 1);
            }
            else if (currentX < toX) {
                item[0].updatePosition(this._map.square(currentX + 1, currentY));
            }
            else if (currentX > toX) {
                item[0].updatePosition(this._map.square(currentX - 1, currentY));
            }
            else if (currentY < toY) {
                item[0].updatePosition(this._map.square(currentX, currentY + 1));
            }
            else if (currentY > toY) {
                item[0].updatePosition(this._map.square(currentX, currentY -1 ));
            }
        });
    }

    addMovement(gameObject, to) {
        this._movements.push([gameObject, to]);
    }
}