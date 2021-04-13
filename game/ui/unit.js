
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

    update() {
        this.node().dataset.buildProgress = this._gameObject.buildProgress.toFixed(2);
    }

    remove() {
        this.node().remove();
    }

    render() {
        return `<div class="ui-unit ${this._gameObject.displayClass()}" data-game-object-id="${this._gameObject.id}" data-build-progress="${this._gameObject.buildProgress.toFixed(2)}">
        </div>`
    }
}