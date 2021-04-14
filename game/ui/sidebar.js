
import UIObject from './object.js';
import UISelection from './selection.js';
import UIOptions from './options.js';
import UIBuildQueue from './buildqueue.js';

export default class UISidebar extends UIObject {

    constructor() {
        super();
        this._selection = new UISelection();
        this._buildqueue = new UIBuildQueue();
        this._options = new UIOptions();
    }

    get selection() {
        return this._selection;
    }

    get buildqueue() {
        return this._buildqueue;
    }

    get options() {
        return this._options;
    }

    render() {
        return `<div class="col-2" id="ui-sidebar">
            <div class="row">
                ${this._selection.render()}
            </div>
            <div class="row">
                ${this._buildqueue.render()}
            </div>
            <div class="row">
                ${this._options.render()}
            </div>
        </div>`
    }
}