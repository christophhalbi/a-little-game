
import GameObject from './object.js';

export default class Resource extends GameObject {

    _stock = 0;
    _unitsPerInterval = 0;

    constructor(stock = 0, unitsPerInterval = 0) {
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

    updateUnitsPerInterval(unitsPerInterval) { // TODO: find out why setter is not working
        this._unitsPerInterval = unitsPerInterval;
    }

    raiseStock() {
        this._stock += this._unitsPerInterval;

        super.fireCustomEvent('onResourceStockChanged', { detail: { gameObject: this } });
    }

    lowerStock(amount) {
        this._stock -= amount;

        super.fireCustomEvent('onResourceStockChanged', { detail: { gameObject: this } });
    }
}