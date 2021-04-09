
import UIResources from './resources.js';
import UIUnits from './units.js';
import UIMap from './map.js';
import UISelection from './selection.js';

export default class UIMain {

    constructor() {
        this._resources = new UIResources();
        this._units = new UIUnits();
        this._map = new UIMap();
        this._selection = new UISelection();
    }

    get resources() {
        return this._resources;
    }

    get units() {
        return this._units;
    }

    get map() {
        return this._map;
    }

    get selection() {
        return this._selection;
    }

    render() {
        return `<div id="ui-content">
            <h2>Content</h2>
            ${this._resources.render()}
            ${this._units.render()}
            ${this._selection.render()}
            ${this._map.render()}
        </div>`
    }
}