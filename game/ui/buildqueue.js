
import UIObject from './object.js';

export default class UIBuildQueue extends UIObject {

    constructor() {
        super();
        this._id = 'ui-buildqueue';
    }

    update(gameObject) {
        let node = document.querySelector(`#${this._id} div[data-id="${gameObject.id}"]`);
        if (node) {
            node.querySelector('span.build-progress').innerHTML = `${gameObject.buildProgress.toFixed(2)}%`;

            if (gameObject.built()) {
                node.remove();
            }
        }
        else {
            document.querySelector(`#${this._id} div`).insertAdjacentHTML('beforeend', this.renderObject(gameObject));
        }
    }

    renderObject(gameObject) {
        return `<div data-id="${gameObject.id}">
            <span>${gameObject.constructor.name}</span><br/>
            <span class="build-progress">${gameObject.buildProgress.toFixed(2)}%</span><br/>
        </div>`;
    }

    render() {
        return `<div id="${this._id}">
            <span>Buildqueue</span>
            <div>
            </div>
        </div>`
    }
}