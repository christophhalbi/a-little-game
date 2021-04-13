
import GameObject from './object.js';

export default class Unit extends GameObject {

    _buildTime = 0;
    _level = 1;

    constructor(position, built = false) {
        super();

        this._position = position;
        this._moveable = true;

        if (built) {
            this._buildTime = this.constructor.timeToBuild;

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

    isWorker() {
        return this.constructor.name === 'Worker';
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