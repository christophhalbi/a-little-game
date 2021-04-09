
import GameData from './game/data.js';

import UISidebar from './game/ui/sidebar.js';
import UIMain from './game/ui/main.js';

export default class Game {

    constructor(targetNode) {
        this._targetNode = targetNode;

        this._data = new GameData();

        this._sidebar = new UISidebar();
        this._main = new UIMain();

        this._targetNode.insertAdjacentHTML('beforeend', this.render());

        this.subscribeEvents();
    }

    start() {
        this._data.init();
    }

    subscribeEvents() {
        document.addEventListener('onResourceCreated', this);
        document.addEventListener('onResourceStockChanged', this);
    }

    handleEvent(event) {
        this[event.type](event);
    }

    onResourceCreated(event) {
        this._main.resources.add(event.detail.gameObject);
    }

    onResourceStockChanged(event) {
        const resource = this._main.resources.find(event.detail.gameObject);

        resource.update();
    }

    render() {
        return `<div>
            ${this._sidebar.render()}
            ${this._main.render()}
        </div>`;
    }
}