
import UIObject from './object.js';

export default class UIUnit extends UIObject {

    constructor(gameObject) {
        super();
        this._gameObject = gameObject;
    }

    get gameObject() {
        return this._gameObject;
    }

    node() {
        return document.querySelector(`div.ui-unit[data-game-object-id="${this._gameObject.id}"]`);
    }

    handleEvent(event) {
        super.fireCustomEvent('onUIUnitClicked', { detail: { gameObject: this._gameObject } });
    }

    addListener() {
        this.node().addEventListener('click', this);
    }

    move() {
        document.querySelector(`div[data-game-object-id="${this._gameObject.position.id}"]`).appendChild(this.node());
    }

    remove() {
        this.node().remove();
    }

    render() {
        return `<div class="ui-unit" data-game-object-id="${this._gameObject.id}">
            <span>${this._gameObject.constructor.name}</span>
        </div>`
    }
}