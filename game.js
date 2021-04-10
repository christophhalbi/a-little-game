
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
        document.addEventListener('onUnitCreated', this);
        document.addEventListener('onUnitMoved', this);
        document.addEventListener('onBuildingCreated', this);
        document.addEventListener('onMapSquareCreated', this);
        document.addEventListener('onUIUnitClicked', this);
        document.addEventListener('onUIBuildingClicked', this);
        document.addEventListener('onUIMoveRequest', this);
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

    onUnitCreated(event) {
        this._main.map.addUnit(event.detail.gameObject);
        this._main.units.raiseCount();
    }

    onUnitMoved(event) {
        const unit = this._main.map.findUnit(event.detail.gameObject);
        unit.move();
    }

    onBuildingCreated(event) {
        this._main.map.addBuilding(event.detail.gameObject);
    }

    onMapSquareCreated(event) {
        this._main.map.add(event.detail.gameObject);
    }

    onUIUnitClicked(event) {
        this._sidebar.selection.set(event.detail.gameObject);
        this._sidebar.selection.update();
    }

    onUIBuildingClicked(event) {
        this._sidebar.selection.set(event.detail.gameObject);
        this._sidebar.selection.update();
    }

    onUIMoveRequest(event) {
        const gameObject = this._sidebar.selection.get();

        if (gameObject && gameObject.moveable) {
            this._data.addMovement(gameObject, event.detail.gameObject);
        }
    }

    render() {
        return `<div class="row">
            ${this._sidebar.render()}
            ${this._main.render()}
        </div>`;
    }
}