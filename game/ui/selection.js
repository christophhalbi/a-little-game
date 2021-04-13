
import UIObject from './object.js';

export default class UISelection extends UIObject {

    constructor() {
        super();
        this._id = 'ui-selection';
    }

    handleEvent(event) {
        if (event.target.dataset.building) {
            super.fireCustomEvent('onUIBuildingBuild', { detail: { gameObject: this._gameObject, building: event.target.dataset.building } });
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

    renderDetails() {
        if (this._gameObject === null) {
            return '';
        }

        if (this._gameObject.constructor.name === 'GameMapSquare') {
            return `
                <span>${this._gameObject.resourceInfo().join('<br/>')}</span><br/>
                <span class="ui-action" data-building="Lumberjack">Build Lumberjack</span><br/>
                <span class="ui-action" data-building="Farm">Build Farm</span>
            `;
        }
        else {
            let content = `<span>${this._gameObject.constructor.name}</span><br/><div class="object ${this._gameObject.displayClass()}"></div>`;

            if (this._gameObject.built()) {
                content += `
                    <span class="level">Level ${this._gameObject.level}</span><br/>
                    <span class="ui-action" data-level_up="1">Level up</span><br/>
                    <span class="ui-action" data-remove="1">Remove</span><br/>
                `;
                if (this._gameObject.canHoldUnits()) {
                    content += `<span>Units</span><br/>`;

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