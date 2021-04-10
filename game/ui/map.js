
import UIObject from './object.js';
import UIMapSquare from './map/square.js';
import UIUnit from './unit.js';
import UIBuilding from './building.js';

export default class UIMap extends UIObject {

    _units = new Map();

    constructor() {
        super();
        this._id = 'ui-map';
    }

    add(gameObject) {
        const square = new UIMapSquare(gameObject);

        document.querySelector(`#${this._id}`).insertAdjacentHTML('beforeend', square.render());

        square.addListener();
    }

    addUnit(gameObject) {
        const unit = new UIUnit(gameObject);

        this._units.set(gameObject.id, unit);

        document.querySelector(`#${this._id} div.ui-map-square[data-game-object-id="${gameObject.position.id}"]`).insertAdjacentHTML('beforeend', unit.render());

        unit.addListener();
    }

    findUnit(gameObject) {
        return this._units.get(gameObject.id);
    }

    addBuilding(gameObject) {
        const building = new UIBuilding(gameObject);

        document.querySelector(`#${this._id} div.ui-map-square[data-game-object-id="${gameObject.position.id}"]`).insertAdjacentHTML('beforeend', building.render());

        building.addListener();
    }

    render() {
        return `<div id="${this._id}" oncontextmenu="return false">
        </div>`
    }
}