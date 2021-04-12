
import UIObject from './object.js';

export default class UIBuilding extends UIObject {

    constructor(gameObject) {
        super();
        this._gameObject = gameObject;
    }

    get gameObject() {
        return this._gameObject;
    }

    homeUnit(unit) {
        unit.remove();

        super.fireCustomEvent('onUIBuildingHomeUnit', { detail: { gameObject: this._gameObject, unit: unit.gameObject } });
    }

    handleEvent(event) {
        super.fireCustomEvent('onUIBuildingClicked', { detail: { gameObject: this._gameObject } });
    }

    addListener() {
        document.querySelector(`div.ui-bulding[data-game-object-id="${this._gameObject.id}"]`).addEventListener('click', this);
    }

    update() {
        const node = document.querySelector(`div.ui-bulding[data-game-object-id="${this._gameObject.id}"]`);
        node.querySelector('span.build-progress').innerHTML = `${this._gameObject.buildProgress.toFixed(2)}%`;
    }

    remove() {
        const node = document.querySelector(`div.ui-bulding[data-game-object-id="${this._gameObject.id}"]`);
        node.remove();
    }

    render() {
        return `<div class="ui-bulding" data-game-object-id="${this._gameObject.id}">
            <span>${this._gameObject.constructor.name}</span>
            <span class="build-progress">${this._gameObject.buildProgress.toFixed(2)}%</span>
        </div>`
    }
}