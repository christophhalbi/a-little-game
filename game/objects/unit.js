
import GameObject from './object.js';

export default class Unit extends GameObject {

    _level = 1;

    constructor(position) {
        super();

        this._position = position;
        this._moveable = true;

        super.fireCustomEvent('onUnitCreated', { detail: { gameObject: this } });
    }

    get position() {
        return this._position;
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
        return true;
    }

    isWorker() {
        return this.constructor.name === 'Worker';
    }

    displayClass() {
        let className = this.constructor.name;
        return className.toLowerCase();
    }
}