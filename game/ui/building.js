
import UIObject from './object.js';

export default class UIBuilding extends UIObject {

    constructor(gameObject) {
        super();
        this._gameObject = gameObject;
    }

    get gameObject() {
        return this._gameObject;
    }

    node() {
        return document.querySelector(`*[data-game-object-id="${this._gameObject.id}"]`);
    }

    homeUnit(unit) {
        unit.remove();
    }

    handleEvent(event) {
        super.fireCustomEvent('onUIBuildingClicked', { detail: { gameObject: this._gameObject } });
    }

    addListener() {
        this.node().addEventListener('click', this);
    }

    update() {
        this.node().dataset.buildProgress = this._gameObject.buildProgress.toFixed(2);
    }

    remove() {
        this.node().remove();
    }

    render() {
        return `<div class="ui-building ${this._gameObject.displayClass()}" data-game-object-id="${this._gameObject.id}" data-build-progress="${this._gameObject.buildProgress.toFixed(2)}">
        </div>`
    }
}