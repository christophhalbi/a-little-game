
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
        this.onInit();
    }

    start() {
        this._data.setup();
    }

    subscribeEvents() {
        // general
        document.addEventListener('onUISave', this);
        document.addEventListener('onUIReset', this);
        // resource-events
        document.addEventListener('onResourceCreated', this);
        document.addEventListener('onResourceStockChanged', this);
        // unit-events
        document.addEventListener('onUnitCreated', this);
        document.addEventListener('onUnitMoved', this);
        document.addEventListener('onUnitMoveDone', this);
        document.addEventListener('onUnitProgressChanged', this);
        document.addEventListener('onUIUnitBuild', this);
        document.addEventListener('onUIUnitClicked', this);
        document.addEventListener('onUIMoveRequest', this);
        document.addEventListener('onUIUnitRemove', this);
        // building-events
        document.addEventListener('onBuildingCreated', this);
        document.addEventListener('onBuildingProgressChanged', this);
        document.addEventListener('onUIBuildingBuild', this);
        document.addEventListener('onUIBuildingClicked', this);
        document.addEventListener('onUIBuildingHomeUnit', this);
        document.addEventListener('onUIBuildingThrowOutUnit', this);
        document.addEventListener('onUIBuildingRemove', this);
        // map-events
        document.addEventListener('onMapSquareCreated', this);
        document.addEventListener('onUISquareClick', this);
    }

    handleEvent(event) {
        this[event.type](event);
    }

    onUISave() {
        this._data.store();
    }

    onUIReset() {
        this._data.reset();

        window.location.reload();
    }

    onInit() {
        this._sidebar.options.addListener();
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
        //unit.moveToPosition();
    }

    onUnitMoveDone(event) {
        const unit = this._main.map.findUnit(event.detail.gameObject);
        const building = this._main.map.findBuildingByPosition(unit.gameObject);

        if (building) {
            building.homeUnit(unit);

            this._sidebar.selection.update();
        }
    }

    onUnitProgressChanged(event) {
        this._sidebar.selection.update();
        this._sidebar.buildqueue.update(event.detail.gameObject);
    }

    onUIUnitBuild(event) {
        const unit = this._data.addUnit(event.detail.unit, event.detail.gameObject);
        if (unit) {
            this._sidebar.selection.set(unit);
        }
    }

    onUIUnitClicked(event) {
        this._sidebar.selection.set(event.detail.gameObject);
    }

    onUIMoveRequest(event) {
        const unitObject = this._sidebar.selection.get();

        if (unitObject && unitObject.moveable) {
            const squareObject = event.detail.gameObject;

            const unit = this._main.map.findUnit(unitObject);

            const unitNode = unit.node();

            const x = (squareObject.x - unitObject.position.x) * 40;
            const y = (squareObject.y - unitObject.position.y) * 40;

            let distance;
            if (x === 0) {
                distance = Math.abs(y);
            }
            else if (y === 0) {
                distance = Math.abs(x);
            }
            else {
                distance = Math.sqrt((x * x) + (y * y));
            }

            console.log(`x ${x}px, y ${y}px, ${distance}`);

            let start;
            let frame;

            function step(timestamp) {
                if (start === undefined)
                    start = timestamp;
                const elapsed = timestamp - start;

                if (x === 0) {
                    // `Math.min()` is used here to make sure that the element stops
                    if (y < 0) {
                        unitNode.style.transform = `translateY(-${Math.max(0.1 * elapsed, y)}px)`;
                    }
                    else {
                        unitNode.style.transform = `translateY(${Math.min(0.1 * elapsed, y)}px)`;
                    }
                }
                else if (y === 0) {
                    // `Math.min()` is used here to make sure that the element stops
                    if (x < 0) {
                        unitNode.style.transform = `translateX(-${Math.max(0.1 * elapsed, x)}px)`;
                    }
                    else {
                        unitNode.style.transform = `translateX(${Math.min(0.1 * elapsed, x)}px)`;
                    }
                }
                else {
                    if (x > 0 && y > 0) {
                        unitNode.style.transform = `translate(${Math.min(0.1 * elapsed, x)}px, ${Math.min(0.1 * elapsed, y)}px)`;
                    }
                    else if (x > 0 && y < 0) {
                        unitNode.style.transform = `translate(${Math.min(0.1 * elapsed, x)}px, -${Math.max(0.1 * elapsed, y)}px)`;
                    }
                    else if (x < 0 && y < 0) {
                        unitNode.style.transform = `translate(-${Math.max(0.1 * elapsed, x)}px, -${Math.max(0.1 * elapsed, y)}px)`;
                    }
                    else if (x < 0 && y > 0) {
                        unitNode.style.transform = `translate(-${Math.max(0.1 * elapsed, x)}px, ${Math.min(0.1 * elapsed, y)}px)`;
                    }
                }

                if (elapsed < (distance * 10)) { // Stop the animation
                    window.requestAnimationFrame(step);
                }
                else {
                    window.cancelAnimationFrame(frame);
                }
            }

            frame = window.requestAnimationFrame(step);

            //unitNode.style.setProperty("WebkitTransform", "none");

            //document.querySelector(`div[data-game-object-id="${squareObject.id}"]`).appendChild(unitNode);
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
        this._sidebar.buildqueue.update(event.detail.gameObject);
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

    onUIBuildingThrowOutUnit(event) {
        this._main.map.addUnit(event.detail.unit);

        this._data.throwOutUnit(event.detail.gameObject, event.detail.unit);

        this._sidebar.selection.update();
    }

    onUIBuildingRemove(event) {
        this._main.map.removeBuilding(event.detail.gameObject);

        this._sidebar.selection.unset();

        this._data.removeBuilding(event.detail.gameObject);
    }

    onMapSquareCreated(event) {
        this._main.map.addSquare(event.detail.gameObject);
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