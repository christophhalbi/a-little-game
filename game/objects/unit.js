
import GameObject from './object.js';

export default class Unit extends GameObject {

    _buildTime = 0;
    _level = 1;

    constructor(position, buildTime = 0, id) {
        if (!position) {
            throw new TypeError('Building: position not defined');
        }

        super(id);

        this._position = position;
        this._buildTime = buildTime;
        this._moveable = true;

        this._class = this.constructor.name;

        if (this.built()) {
            super.fireCustomEvent('onUnitCreated', { detail: { gameObject: this } });
        }
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

    updatePosition(position) { // TODO: find out why setter is not working
        this._position = position;
        super.fireCustomEvent('onUnitMoved', { detail: { gameObject: this } });
    }

    moveDone() {
        super.fireCustomEvent('onUnitMoveDone', { detail: { gameObject: this } });
    }

    built() {
        return this.buildProgress === 100;
    }

    raiseBuild() {
        this._buildTime += 1000;

        super.fireCustomEvent('onUnitProgressChanged', { detail: { gameObject: this } });

        if (this.built()) {
            super.fireCustomEvent('onUnitCreated', { detail: { gameObject: this } });
        }
    }

    displayClass() {
        let className = this.constructor.name;
        return className.toLowerCase();
    }
}