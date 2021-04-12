
import GameObject from './object.js';

export default class Unit extends GameObject {

    constructor(position) {
        super();

        this._position = position;
        this._moveable = true;

        super.fireCustomEvent('onUnitCreated', { detail: { gameObject: this } });
    }

    get position() {
        return this._position;
    }

    updatePosition(position) { // TODO: find out why setter is not working
        this._position = position;
        super.fireCustomEvent('onUnitMoved', { detail: { gameObject: this } });
    }
}