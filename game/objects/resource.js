
import GameObject from './object.js';

export default class Resource extends GameObject {

    _stock = 0;
    _unitsPerInterval = 0;

    constructor(stock, unitsPerInterval) {
        super();

        this._stock = stock;
        this._unitsPerInterval = unitsPerInterval;

        super.fireCustomEvent('onResourceCreated', { detail: { gameObject: this } });
    }

    get stock() {
        return this._stock;
    }

    get unitsPerInterval() {
        return this._unitsPerInterval;
    }

    raiseStock() {
        this._stock += this._unitsPerInterval;

        super.fireCustomEvent('onResourceStockChanged', { detail: { gameObject: this } });
    }
}