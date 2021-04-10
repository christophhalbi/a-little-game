
import GameObject from './object.js';

export default class Building extends GameObject {

    constructor(position) {
        super();

        this._position = position;

        super.fireCustomEvent('onBuildingCreated', { detail: { gameObject: this } });
    }

    get position() {
        return this._position;
    }
}