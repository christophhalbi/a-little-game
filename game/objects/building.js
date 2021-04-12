
import GameObject from './object.js';

export default class Building extends GameObject {

    _buildTime = 0;
    _level = 1;

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

    built() {
        return this.buildProgress == 100;
    }

    raiseBuild() {
        this._buildTime += 1000;

        super.fireCustomEvent('onBuildingProgressChanged', { detail: { gameObject: this } });
    }
}