
import ResourceWood from './objects/resource/wood.js';
import ResourceFood from './objects/resource/food.js';
import ResourceIron from './objects/resource/iron.js';
import Soldier from './objects/unit/soldier.js';
import Worker from './objects/unit/worker.js';
import Castle from './objects/building/castle.js';
import Lumberjack from './objects/building/lumberjack.js';
import Farm from './objects/building/farm.js';
import GameMap from './objects/map.js';

export default class GameData {

    _resources = [];
    _buildings = [];
    _units     = [];

    _movements = [];

    constructor() {

    }

    init() {
        this._resources.push(new ResourceWood(500));
        this._resources.push(new ResourceFood(500));
        this._resources.push(new ResourceIron(0));

        this._map = new GameMap(20, 20);

        this._buildings.push(new Castle(this._map.square(6, 5), true));

        this._units.push(new Soldier(this._map.square(5, 4), true));
        this._units.push(new Soldier(this._map.square(8, 1), true));
        this._units.push(new Soldier(this._map.square(8, 2), true));
        this._units.push(new Worker(this._map.square(12, 5), true));
        this._units.push(new Worker(this._map.square(13, 5), true));

        let runResourceInterval = this.runResourceInterval.bind(this);

        setInterval(runResourceInterval, 5000);

        let runMovementInterval = this.runMovementInterval.bind(this);

        setInterval(runMovementInterval, 1000);

        let runBuildInterval = this.runBuildInterval.bind(this);

        setInterval(runBuildInterval, 1000);
    }

    runResourceInterval() {
        this._resources.forEach(resource => {
            let unitsPerInterval = 0;
            this._buildings.filter(building => building.built() && building.working() && building.produces(resource)).forEach(building => {
                unitsPerInterval += building.produce(resource);
            });

            resource.updateUnitsPerInterval(unitsPerInterval);
            resource.raiseStock();
        });
    }

    runMovementInterval() {
        this._movements.forEach((item, index, arr) => {
            const currentX = item[0].position.x;
            const currentY = item[0].position.y;
            const toX = item[1].x;
            const toY = item[1].y;

            if (currentX === toX && currentY === toY) {
                arr.splice(index, 1);
                item[0].moveDone();
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

    runBuildInterval() {
        this._buildings.filter(building => !building.built() && building.working()).forEach(building => {
            building.raiseBuild();
        });
        this._units.filter(unit => !unit.built()).forEach(unit => {
            unit.raiseBuild();
        });
    }

    addMovement(gameObject, to) {
        this._movements.push([gameObject, to]);
    }

    addBuilding(buildingClass, to) {
        const building = this.add(buildingClass, to);
        if (building) {
            this._buildings.push(building);

            return building;
        }

        return;
   }

    addUnit(unitClass, originBuilding) {
        const square = this._map.square(originBuilding.position.x + 1, originBuilding.position.y);
        const unit = this.add(unitClass, square);
        if (unit) {
            this._units.push(unit);

            return unit;
        }

        return;
    }

    add(buildClass, to) {
        const className = eval(buildClass);

        if (this.isAffordable(className)) {
            const object = new className(to);

            for (let costs of object.constructor.costs) {
                const resource = this._resources.find(resource => resource.constructor.name === costs[0]);
                resource.lowerStock(costs[1]);
            }

            return object;
        }

        return;
    }

    isAffordable(className) {
        let affordable = true;

        for (let costs of className.costs) {
            const resource = this._resources.find(resource => resource.constructor.name === costs[0]);
            if (costs[1] > resource.stock) {
                affordable = false;
                break;
            }
        }

        return affordable;
    }

    removeBuilding(gameObject) {
        const index = this._buildings.findIndex(building => building.id === gameObject.id);
        this._buildings.splice(index, 1);
    }

    homeUnit(building, unit) {
        building.homeUnit(unit);
    }

    throwOutUnit(building, unit) {
        building.throwOutUnit(unit);

        // TODO: make sure position is in map
        unit.updatePosition(this._map.square(building.position.x + 1, building.position.y));
    }

    removeUnit(gameObject) {
        const index = this._units.findIndex(unit => unit.id === gameObject.id);
        this._units.splice(index, 1);
    }
}