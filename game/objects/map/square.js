
import GameObject from "../object.js";

export default class GameMapSquare extends GameObject {

    constructor(x, y) {
        super();

        this._x = x;
        this._y = y;

        super.fireCustomEvent('onMapSquareCreated', { detail: { gameObject: this } });
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}