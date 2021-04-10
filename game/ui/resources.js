
import UIObject from './object.js';
import UIResource from './resource.js';

export default class UIResources extends UIObject {

    _resources = new Map();

    constructor() {
        super();
        this._id = 'ui-resources';
    }

    add(gameObject) {
        const resource = new UIResource(gameObject);

        this._resources.set(gameObject.id, resource);

        document.querySelector(`#${this._id} div`).insertAdjacentHTML('beforeend', resource.render());
    }

    find(gameObject) {
        return this._resources.get(gameObject.id);
    }

    render() {
        return `<div id="${this._id}">
            <span>Resources</span>
            <div>
            </div>
        </div>`
    }
}