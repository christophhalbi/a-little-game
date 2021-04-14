
import GameMapSquare from "./map/square.js";
import GameObject from "./object.js";

export default class GameMap extends GameObject {

    _data = [];

    constructor(rows = 0, columns = 0, id) {
        super(id);

        for (let x = 0; x < rows; x++) {
            this._data[x] = [];

            for (let y = 0; y < columns; y++) {
                this._data[x][y] = new GameMapSquare(x, y);
            }
        }
    }

    static createFromJSON(json) {
        let object = new GameMap(0, 0, json._id);

        for (let x = 0; x < json._data.length; x++) {
            object._data[x] = [];

            for (let y = 0; y < json._data[x].length; y++) {
                object._data[x][y] = GameMapSquare.createFromJSON(json._data[x][y]);
            }
        }

        return object;
    }

    square(x, y) {
        const object = this._data[x][y];
        if (!object) {
            throw new RangeError(`GameMap: nothing found for x ${x} and y ${y}`);
        }
        return object;
    }
}