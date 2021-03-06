
import UIObject from './object.js';
import UIMapSquare from './map/square.js';
import UIUnit from './unit.js';
import UIBuilding from './building.js';

export default class UIMap extends UIObject {

    _units = new Map();
    _buildings = new Map();

    constructor() {
        super();
        this._id = 'ui-map';
    }

    positionNode(position) {
        return document.querySelector(`#${this._id} div.ui-map-square[data-game-object-id="${position.id}"]`);
    }

    addSquare(gameObject) {
        const square = new UIMapSquare(gameObject);

        document.querySelector(`#${this._id}`).insertAdjacentHTML('beforeend', square.render());

        square.addListener();
    }

    addUnit(gameObject) {
        const unit = new UIUnit(gameObject);

        this._units.set(gameObject.id, unit);

        this.positionNode(gameObject.position).insertAdjacentHTML('beforeend', unit.render());

        unit.addListener();
    }

    findUnit(gameObject) {
        return this._units.get(gameObject.id);
    }

    removeUnit(gameObject) {
        const unit = this.findUnit(gameObject);

        unit.remove();

        this._units.delete(gameObject.id);
    }

    addBuilding(gameObject) {
        const building = new UIBuilding(gameObject);

        this._buildings.set(gameObject.id, building);

        this.positionNode(gameObject.position).insertAdjacentHTML('beforeend', building.render());

        building.addListener();
    }

    findBuilding(gameObject) {
        return this._buildings.get(gameObject.id);
    }

    findBuildingByPosition(gameObject) {
        let find;

        this._buildings.forEach((building) => {
            if (building.gameObject.position.id === gameObject.position.id) {
                find = building;
                return;
            }
        });

        return find;
    }

    removeBuilding(gameObject) {
        const building = this.findBuilding(gameObject);

        building.remove();

        this._buildings.delete(gameObject.id);
    }

    render() {
        return `<div id="${this._id}" oncontextmenu="return false">
        </div>`
    }
}