
import UIObject from './object.js';
import UIResources from './resources.js';
import UIUnits from './units.js';
import UIMap from './map.js';

export default class UIMain extends UIObject {

    constructor() {
        super();
        this._resources = new UIResources();
        this._units = new UIUnits();
        this._map = new UIMap();
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

    render() {
        return `<div class="col-10" id="ui-content">
            <div class="row">
                <div class="col-6">
                    ${this._resources.render()}
                </div>
                <div class="col-6">
                    ${this._units.render()}
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    ${this._map.render()}
                </div>
            </div>
        </div>`
    }
}