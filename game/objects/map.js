
import GameMapSquare from "./map/square.js";
import GameObject from "./object.js";

export default class GameMap extends GameObject {

    _data = [];

    constructor(rows, columns) {
        super();

        for (let x = 0; x < rows; x++) {
            this._data[x] = [];

            for (let y = 0; y < columns; y++) {
                this._data[x][y] = new GameMapSquare(x, y);
            }
        }

        super.fireCustomEvent('onMapCreated', { detail: { gameObject: this } });
    }

    square(x, y) {
        return this._data[x][y];
    }
}