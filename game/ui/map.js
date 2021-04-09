
import UIMapSquare from './map/square.js';
import UIUnit from './unit.js';

export default class UIMap {

    constructor() {
        this._id = 'ui-map';
    }

    add(gameObject) {
        const square = new UIMapSquare(gameObject);

        document.querySelector(`#${this._id}`).insertAdjacentHTML('beforeend', square.render());
    }

    addUnit(gameObject) {
        const unit = new UIUnit(gameObject);

        document.querySelector(`#${this._id} div.ui-map-source[data-game-object-id="${gameObject.position.id}"]`).insertAdjacentHTML('beforeend', unit.render());
    }

    render() {
        return `<div id="${this._id}">
        </div>`
    }
}