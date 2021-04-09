
import GameObject from "./../../objects/object.js";

export default class GameMapSquare extends GameObject {

    constructor(x, y) {
        super();

        this._x = x;
        this._y = y;

        super.fireCustomEvent('onMapSquareCreated', { detail: { gameObject: this } });
    }
}