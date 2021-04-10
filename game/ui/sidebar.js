
import UIObject from './object.js';

export default class UISidebar extends UIObject {

    constructor() {
        super();
    }

    render() {
        return `<div id="ui-sidebar">
            <h2>Sidebar</h2>
        </div>`
    }
}