
import UIObject from './object.js';

export default class UIUnits extends UIObject {

    constructor() {
        super();
        this._id = 'ui-resources';
        this._count = 0;
    }

    raiseCount() {
        this._count++;

        document.querySelector(`#${this._id} span.count`).innerHTML = this._count;
    }

    render() {
        return `<div id="${this._id}">
            <span>Units <span class="count"/></span>
        </div>`
    }
}