
import UIObject from './object.js';
import UIBuildQueue from './buildqueue.js';

export default class UISidebarRight extends UIObject {

    constructor() {
        super();
        this._buildqueue = new UIBuildQueue();
    }

    get buildqueue() {
        return this._buildqueue;
    }

    render() {
        return `<div class="col-2" id="ui-sidebarright">
            <div class="row my-3">
                ${this._buildqueue.render()}
            </div>
        </div>`
    }
}