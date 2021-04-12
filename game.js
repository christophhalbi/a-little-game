
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
        document.addEventListener('onUnitMoveDone', this);
        document.addEventListener('onUIUnitClicked', this);
        document.addEventListener('onUIMoveRequest', this);
        document.addEventListener('onUIUnitRemove', this);
        // building-events
        document.addEventListener('onBuildingCreated', this);
        document.addEventListener('onBuildingProgressChanged', this);
        document.addEventListener('onUIBuildingBuild', this);
        document.addEventListener('onUIBuildingClicked', this);
        document.addEventListener('onUIBuildingHomeUnit', this);
        document.addEventListener('onUIBuildingRemove', this);
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

    onUnitMoveDone(event) {
        const unit = this._main.map.findUnit(event.detail.gameObject);
        const building = this._main.map.findBuildingByPosition(unit.gameObject);

        if (building) {
            building.homeUnit(unit);
        }
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

    onUIUnitRemove(event) {
        this._main.map.removeUnit(event.detail.gameObject);

        this._main.units.lowerCount();

        this._sidebar.selection.unset();

        this._data.removeUnit(event.detail.gameObject);
    }

    onBuildingCreated(event) {
        this._main.map.addBuilding(event.detail.gameObject);
    }

    onBuildingProgressChanged(event) {
        const building = this._main.map.findBuilding(event.detail.gameObject);
        building.update();

        this._sidebar.selection.update();
    }

    onUIBuildingBuild(event) {
        const building = this._data.addBuilding(event.detail.building, event.detail.gameObject);
        if (building) {
            this._sidebar.selection.set(building);
        }
    }

    onUIBuildingClicked(event) {
        this._sidebar.selection.set(event.detail.gameObject);
    }

    onUIBuildingHomeUnit(event) {
        this._data.homeUnit(event.detail.gameObject, event.detail.unit);
    }

    onUIBuildingRemove(event) {
        this._main.map.removeBuilding(event.detail.gameObject);

        this._sidebar.selection.unset();

        this._data.removeBuilding(event.detail.gameObject);
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