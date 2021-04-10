
import UIObject from './object.js';

export default class UIUnit extends UIObject {

    constructor(gameObject) {
        super();
        this._gameObject = gameObject;
    }

    handleEvent(event) {
        super.fireCustomEvent('onUIUnitClicked', { detail: { gameObject: this._gameObject } });
    }

    addListener() {
        document.querySelector(`div.ui-unit[data-game-object-id="${this._gameObject.id}"]`).addEventListener('click', this);
    }

    move() {
        document.querySelector(`div[data-game-object-id="${this._gameObject.position.id}"]`).appendChild(document.querySelector(`div.ui-unit[data-game-object-id="${this._gameObject.id}"]`));
    }

    render() {
        return `<div class="ui-unit" data-game-object-id="${this._gameObject.id}">
            <span>${this._gameObject.constructor.name}</span>
        </div>`
    }
}