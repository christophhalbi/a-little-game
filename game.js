
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
        // resource-events
        document.addEventListener('onResourceCreated', this);
        document.addEventListener('onResourceStockChanged', this);
        // unit-events
        document.addEventListener('onUnitCreated', this);
        document.addEventListener('onUnitMoved', this);
        document.addEventListener('onUIUnitClicked', this);
        document.addEventListener('onUIMoveRequest', this);
        // building-events
        document.addEventListener('onBuildingCreated', this);
        document.addEventListener('onBuildingProgressChanged', this);
        document.addEventListener('onUIBuildingClicked', this);
        document.addEventListener('onUIBuildingBuild', this);
        // map-events
        document.addEventListener('onMapSquareCreated', this);
        document.addEventListener('onUISquareClick', this);
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

    onUIUnitClicked(event) {
        this._sidebar.selection.set(event.detail.gameObject);
    }

    onUIMoveRequest(event) {
        const gameObject = this._sidebar.selection.get();

        if (gameObject && gameObject.moveable) {
            this._data.addMovement(gameObject, event.detail.gameObject);
        }
    }

    onBuildingCreated(event) {
        this._main.map.addBuilding(event.detail.gameObject);
    }

    onBuildingProgressChanged(event) {
        const building = this._main.map.findBuilding(event.detail.gameObject);
        building.update();
    }

    onUIBuildingClicked(event) {
        this._sidebar.selection.set(event.detail.gameObject);
    }

    onUIBuildingBuild(event) {
        const building = this._data.addBuilding(event.detail.building, event.detail.gameObject);
        if (building) {
            this._sidebar.selection.set(building);
        }
    }

    onMapSquareCreated(event) {
        this._main.map.add(event.detail.gameObject);
    }

    onUISquareClick(event) {
        this._sidebar.selection.set(event.detail.gameObject);
    }

    render() {
        return `<div class="row">
            ${this._sidebar.render()}
            ${this._main.render()}
        </div>`;
    }
}