
import GameObject from './object.js';

export default class Building extends GameObject {

    _buildTime = 0;
    _level = 1;

    _units = [];

    constructor(position, built = false) {
        super();

        this._position = position;

        if (built) {
            this._buildTime = this.constructor.timeToBuild;
        }

        super.fireCustomEvent('onBuildingCreated', { detail: { gameObject: this } });
    }

    get position() {
        return this._position;
    }

    get buildProgress() {
        return (this._buildTime / this.constructor.timeToBuild) * 100;
    }

    get level() {
        return this._level;
    }

    get units() {
        return this._units;
    }

    canHoldUnits() {
        return true;
    }

    canProduceUnits() {
        return this.constructor.producesUnits.size;
    }

    produceableUnits() {
        return this.constructor.producesUnits.keys();
    }

    built() {
        return this.buildProgress === 100;
    }

    working() {
        return this._units.filter(unit => unit.isWorker()).length >= this.constructor.workersNeeded;
    }

    homeUnit(unit) {
        this._units.push(unit);
    }

    throwOutUnit(unit) {
        const index = this._units.findIndex(unitItem => unitItem.id === unit.id);
        this._units.splice(index, 1);
    }

    raiseBuild() {
        this._buildTime += 1000;

        super.fireCustomEvent('onBuildingProgressChanged', { detail: { gameObject: this } });
    }

    produces(resourceObject) {
        return this.constructor.producesResource.has(resourceObject.constructor.name);
    }

    produce(resourceObject) {
        return this.constructor.producesResource.get(resourceObject.constructor.name) * this._position.produceFactor(this);
    }

    displayClass() {
        let className = this.constructor.name;
        return className.toLowerCase();
    }
}