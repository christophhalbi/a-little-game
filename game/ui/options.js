
import UIObject from './object.js';

export default class UIOptions extends UIObject {

    constructor() {
        super();
        this._id = 'ui-options';
    }

    handleEvent(event) {
        if (event.target.dataset.save) {
            super.fireCustomEvent('onUISave');
        }
        else if (event.target.dataset.reset) {
            super.fireCustomEvent('onUIReset');
        }
    }

    addListener() {
        const nodes = document.querySelectorAll(`#${this._id} div span.ui-action`);

        for (let node of nodes) {
            node.addEventListener('click', this);
        }
    }

    render() {
        return `<div id="${this._id}">
            <span>Options</span>
            <div>
                <span class="ui-action" data-save="1">Save</span><br/>
                <span class="ui-action" data-reset="1">Reset</span><br/>
            </div>
        </div>`
    }
}