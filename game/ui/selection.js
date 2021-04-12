
import UIObject from './object.js';

export default class UISelection extends UIObject {

    constructor() {
        super();
        this._id = 'ui-selection';
    }

    handleEvent(event) {
        super.fireCustomEvent('onUIBuildingBuild', { detail: { gameObject: this._gameObject, building: event.target.dataset.building } });
    }

    update() {
        const node = document.querySelector(`#${this._id} div`);

        node.innerHTML = '';
        node.insertAdjacentHTML('beforeend', this.renderDetails());

        this.addListener();
    }

    addListener() {
        const nodes = document.querySelectorAll(`#${this._id} div span.ui-build`);

        for (let node of nodes) {
            node.addEventListener('click', this);
        }
    }

    get() {
        return this._gameObject;
    }

    set(gameObject) {
        this._gameObject = gameObject;
        this.update();
    }

    renderDetails() {
        if (this._gameObject.constructor.name === 'GameMapSquare') {
            return `
                <span class="ui-build" data-building="Lumberjack">Build Lumberjack</span><br/>
                <span class="ui-build" data-building="Farm">Build Farm</span>
            `;
        }
        else {
            return `
                <span>${this._gameObject.constructor.name}
            `
        }
    }

    render() {
        return `<div id="${this._id}">
            <span>Selection</span>
            <div>
            </div>
        </div>`
    }
}