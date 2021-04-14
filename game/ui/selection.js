
import GameMapSquare from '../objects/map/square.js';
import UIObject from './object.js';

export default class UISelection extends UIObject {

    constructor() {
        super();
        this._id = 'ui-selection';
    }

    handleEvent(event) {
        if (event.target.dataset.createBuilding) {
            super.fireCustomEvent('onUIBuildingBuild', { detail: { gameObject: this._gameObject, building: event.target.dataset.createBuilding } });
        }
        else if (event.target.dataset.createUnit) {
            super.fireCustomEvent('onUIUnitBuild', { detail: { gameObject: this._gameObject, unit: event.target.dataset.createUnit } });
        }
        else if (event.target.dataset.level_up) {
            console.log("level up");
        }
        else if (event.target.dataset.remove) {
            super.fireCustomEvent(`onUI${Object.getPrototypeOf(this._gameObject.constructor).name}Remove`, { detail: { gameObject: this._gameObject } });
        }
        else if (event.target.dataset.throwOutUnit) {
            const unit = this._gameObject.units.find(unit => unit.id === parseInt(event.target.dataset.throwOutUnit));
            super.fireCustomEvent(`onUIBuildingThrowOutUnit`, { detail: { gameObject: this._gameObject, unit: unit } });
        }
    }

    update() {
        const node = document.querySelector(`#${this._id} div`);

        node.innerHTML = '';
        node.insertAdjacentHTML('beforeend', this.renderDetails());

        this.addListener();
    }

    addListener() {
        const nodes = document.querySelectorAll(`#${this._id} div span.ui-action`);

        for (let node of nodes) {
            node.addEventListener('click', this);
        }
    }

    get() {
        return this._gameObject;
    }

    unset() {
        this._gameObject = null;
        this.update();
    }

    set(gameObject) {
        this._gameObject = gameObject;
        this.update();
    }

    buildCostInfo(className) {
        let costInfo = [];
        className.costs.forEach((value, key) => {
            costInfo.push(`${key.name}: ${value}`);
        });

        return costInfo.join(', ');
    }

    renderDetails() {
        if (this._gameObject === null) {
            return '';
        }

        if (this._gameObject instanceof GameMapSquare) {
            let content = `<span>${this._gameObject.resourceInfo().join('<br/>')}</span><br/>`;

            for (let className of this._gameObject.produceableBuildings()) {
                content += `<span class="ui-action" data-create-building="${className.name}" title="${this.buildCostInfo(className)}">Create ${className.name}</span><br/>`;
            };

            return content;
        }
        else {
            let content = `<span>${this._gameObject.constructor.name}</span><br/><div class="object ${this._gameObject.displayClass()}"></div>`;

            if (this._gameObject.built()) {
                content += `
                    <span class="level">Level ${this._gameObject.level}</span><br/>
                    <span class="ui-action" data-level_up="1">Level up</span><br/>
                    <span class="ui-action" data-remove="1">Remove</span><br/>
                `;

                if (this._gameObject.canProduceUnits()) {
                    content += `<span>Units</span><br/>`;

                    for (let className of this._gameObject.produceableUnits()) {
                        content += `<span class="ui-action" data-create-unit="${className.name}" title="${this.buildCostInfo(className)}">Create ${className.name}</span><br/>`;
                    };
                }

                if (this._gameObject.canHoldUnits()) {
                    content += `<span>Units inside</span><br/>`;

                    this._gameObject.units.forEach(unit => {
                        content += `<span class="ui-action" data-throw-out-unit="${unit.id}">${unit.constructor.name} Remove</span><br/>`;
                    });
                }
            }
            else {
                content += `
                    <span class="build-progress">${this._gameObject.buildProgress.toFixed(2)}%</span>
                `;
            }

            return content;
        }
    }

    render() {
        return `<div id="${this._id}">
            <span>Selection</span>
            <div>
            </div>
        </div>`
    }
}