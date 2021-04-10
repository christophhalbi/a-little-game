
import UIObject from './../object.js';

export default class UIMapSquare extends UIObject {

    constructor(gameObject) {
        super();
        this._gameObject = gameObject;
    }

    handleEvent(event) {
        if (event.which == 3) {
            event.preventDefault();

            super.fireCustomEvent('onUIMoveRequest', { detail: { gameObject: this._gameObject } });
        }
    }

    addListener() {
        document.querySelector(`div.ui-map-square[data-game-object-id="${this._gameObject.id}"]`).addEventListener('mousedown', this);
    }

    render() {
        return `<div class="ui-map-square" data-game-object-id="${this._gameObject.id}">
        </div>`
    }
}