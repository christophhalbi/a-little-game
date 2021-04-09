
import UIResource from './resource.js';

export default class UIResources {

    _resources = [];

    constructor() {
        this._id = 'ui-resources';
    }

    add(gameObject) {
        const resource = new UIResource(gameObject);

        this._resources.push(resource);

        document.querySelector(`#${this._id} div`).insertAdjacentHTML('beforeend', resource.render());
    }

    find(gameObject) {
        return this._resources.find(resource => resource.gameObject.id === gameObject.id);
    }

    render() {
        return `<div id="${this._id}">
            <span>Resources</span>
            <div>
            </div>
        </div>`
    }
}