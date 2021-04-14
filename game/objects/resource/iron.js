
import Resource from './../resource.js';

export default class Iron extends Resource {

    constructor(stock, unitsPerInterval, id) {
        super(stock, unitsPerInterval, id);
    }

    static createFromJSON(json) {
        return new Iron(json._stock, json._unitsPerInterval, json._id);
    }
}