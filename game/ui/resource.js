
import UIObject from './object.js';

export default class UIResource extends UIObject {

    constructor(gameObject) {
        super();
        this._gameObject = gameObject;
    }

    get gameObject() {
        return this._gameObject;
    }

    update() {
        const node = document.querySelector(`div.ui-resource[data-game-object-id="${this._gameObject.id}"]`);
        node.querySelector('span.stock').innerHTML = this._gameObject.stock;
        node.querySelector('span.units-per-interval').innerHTML = `+${this._gameObject.unitsPerInterval}`;
    }

    render() {
        return `<div class="ui-resource col-4" data-game-object-id="${this._gameObject.id}">
            <span>
                ${this._gameObject.constructor.name}
                <span class="stock">${this._gameObject.stock}</span>
                <span class="units-per-interval">+${this._gameObject.unitsPerInterval}</span>
            </span>
        </div>`
    }
}