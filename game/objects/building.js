
import GameObject from './object.js';

export default class Building extends GameObject {

    constructor(name, position) {
        super();

        this._name = name;
        this._position = position;

        super.fireCustomEvent('onBuildingCreated', { detail: { gameObject: this } });
    }

    get name() {
        return this._name;
    }

    get position() {
        return this._position;
    }
}