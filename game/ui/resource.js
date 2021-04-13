
import UIObject from './object.js';

export default class UIResource extends UIObject {

    constructor(gameObject) {
        super();
        this._gameObject = gameObject;
    }

    get gameObject() {
        return this._gameObject;
    }

    node() {
        return document.querySelector(`div.ui-resource[data-game-object-id="${this._gameObject.id}"]`);
    }

    update() {
        const node = this.node();
        node.querySelector('span.stock').innerHTML = this._gameObject.stock.toFixed(2);
        node.querySelector('span.units-per-interval').innerHTML = `+${this._gameObject.unitsPerInterval.toFixed(2)}`;
    }

    render() {
        return `<div class="ui-resource col-4" data-game-object-id="${this._gameObject.id}">
            <span>
                ${this._gameObject.constructor.name}
                <span class="stock">${this._gameObject.stock.toFixed(2)}</span>
                <span class="units-per-interval">+${this._gameObject.unitsPerInterval.toFixed(2)}</span>
            </span>
        </div>`
    }
}