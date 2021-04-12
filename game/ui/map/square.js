
import UIObject from './../object.js';

export default class UIMapSquare extends UIObject {

    constructor(gameObject) {
        super();
        this._gameObject = gameObject;
    }

    handleEvent(event) {
        if (event.which == 1) {
            super.fireCustomEvent('onUISquareClick', { detail: { gameObject: this._gameObject } });
        }
        else if (event.which == 3) {
            super.fireCustomEvent('onUIMoveRequest', { detail: { gameObject: this._gameObject } });
        }
    }

    addListener() {
        document.querySelector(`div.ui-map-square[data-game-object-id="${this._gameObject.id}"]`).addEventListener('mousedown', this);
    }

    render() {
        return `<div class="ui-map-square ${this._gameObject.displayClass()}" title="${this._gameObject.resourceInfo().join(', ')}" data-game-object-id="${this._gameObject.id}">
        </div>`
    }
}