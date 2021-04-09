
import UIResources from './resources.js';
import UIUnits from './units.js';

export default class UIMain {

    constructor() {
        this._resources = new UIResources();
        this._units = new UIUnits();
    }

    get resources() {
        return this._resources;
    }

    get units() {
        return this._units;
    }

    render() {
        return `<div id="ui-content">
            <h2>Content</h2>
            ${this._resources.render()}
            ${this._units.render()}
        </div>`
    }
}