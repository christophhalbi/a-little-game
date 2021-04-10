
import UIObject from './object.js';

export default class UIBuilding extends UIObject {

    constructor(gameObject) {
        super();
        this._gameObject = gameObject;
    }

    handleEvent(event) {
        super.fireCustomEvent('onUIBuildingClicked', { detail: { gameObject: this._gameObject } });
    }

    addListener() {
        document.querySelector(`div.ui-bulding[data-game-object-id="${this._gameObject.id}"]`).addEventListener('click', this);
    }

    render() {
        return `<div class="ui-bulding" data-game-object-id="${this._gameObject.id}">
            <span>${this._gameObject.name}</span>
        </div>`
    }
}