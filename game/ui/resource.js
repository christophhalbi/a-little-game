
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
        document.querySelector(`div.ui-resource[data-game-object-id="${this._gameObject.id}"] span.stock`).innerHTML = this._gameObject.stock;
    }

    render() {
        return `<div class="ui-resource" data-game-object-id="${this._gameObject.id}">
            <span>${this._gameObject.constructor.name} <span class="stock">${this._gameObject.stock}</span></span>
        </div>`
    }
}