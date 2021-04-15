
import UIObject from './object.js';

export default class UIBuildQueue extends UIObject {

    _count = 0;

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
                this._count--;
            }
        }
        else {
            document.querySelector(`#${this._id} div`).insertAdjacentHTML('beforeend', this.renderObject(gameObject));
            this._count++;
        }

        if (this._count > 0) {
            document.querySelector(`#${this._id} em`).classList.add('d-none');
        }
        else {
            document.querySelector(`#${this._id} em`).classList.remove('d-none');
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
            <strong class="border-bottom">Buildqueue</strong>
            <div>
                <em>Nothing in queue</em>
            </div>
        </div>`
    }
}