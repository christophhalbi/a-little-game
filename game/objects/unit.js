
import GameObject from './object.js';

export default class Unit extends GameObject {

    constructor(name, position) {
        super();

        this._name = name;
        this._position = position;
        this._moveable = true;

        super.fireCustomEvent('onUnitCreated', { detail: { gameObject: this } });
    }

    get name() {
        return this._name;
    }

    get position() {
        return this._position;
    }

    updatePosition(position) {
        this._position = position;
        super.fireCustomEvent('onUnitMoved', { detail: { gameObject: this } });
    }
}