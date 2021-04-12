
import GameObject from "../object.js";

export default class GameMapSquare extends GameObject {

    _factorWood;
    _factorFarmland;

    constructor(x, y) {
        super();

        this._x = x;
        this._y = y;

        this._factorWood = (0.2 + Math.random()).toFixed(2);
        this._factorFarmland = Math.random().toFixed(2);

        super.fireCustomEvent('onMapSquareCreated', { detail: { gameObject: this } });
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    displayClass() {
        if (this._factorWood > 0.7) {
            return 'forest';
        }
        else if (this._factorFarmland > 0.7) {
            return 'farmland';
        }
        else {
            return 'dead';
        }
    }

    resourceInfo() {
        return [`Wood: ${this._factorWood}`, `Farmland: ${this._factorFarmland}`];
    }

    produceFactor(buildingObject) {
        const className = buildingObject.constructor.name;
        return className === 'Lumberjack'
            ? this._factorWood
            : className === 'Farm'
                ? this._factorFarmland
                : 0;
    }
}