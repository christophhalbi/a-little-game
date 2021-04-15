
import GameMapSquare from "./map/square.js";
import GameObject from "./object.js";

export default class GameMap extends GameObject {

    _data = [];

    constructor(rows = 0, columns = 0, id) {
        super(id);

        for (let y = 0; y < rows; y++) {
            this._data[y] = [];

            for (let x = 0; x < columns; x++) {
                this._data[y][x] = new GameMapSquare(x, y);
            }
        }
    }

    static createFromJSON(json) {
        let object = new GameMap(0, 0, json._id);

        for (let y = 0; y < json._data.length; y++) {
            object._data[y] = [];

            for (let x = 0; x < json._data[y].length; x++) {
                object._data[y][x] = GameMapSquare.createFromJSON(json._data[y][x]);
            }
        }

        return object;
    }

    square(x, y) {
        const object = this._data[y][x];
        if (!object) {
            throw new RangeError(`GameMap: nothing found for x ${x} and y ${y}`);
        }
        return object;
    }
}