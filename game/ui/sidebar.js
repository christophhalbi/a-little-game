
import UIObject from './object.js';
import UISelection from './selection.js';

export default class UISidebar extends UIObject {

    constructor() {
        super();
        this._selection = new UISelection();
    }

    get selection() {
        return this._selection;
    }

    render() {
        return `<div class="col-2" id="ui-sidebar">
            <div class="row">
                ${this._selection.render()}
            </div>
        </div>`
    }
}