
import UIResources from './resources.js';

export default class UIMain {

    constructor() {
        this._resources = new UIResources();
    }

    get resources() {
        return this._resources;
    }

    render() {
        return `<div id="ui-content">
            <h2>Content</h2>
            ${this._resources.render()}
        </div>`
    }
}