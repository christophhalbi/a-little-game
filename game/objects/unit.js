
import GameObject from './object.js';

export default class Unit extends GameObject {

    constructor() {
        super();

        super.fireCustomEvent('onUnitCreated', { detail: { gameObject: this } });
    }
}