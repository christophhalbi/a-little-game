
import Resource from './../resource.js';

export default class Wood extends Resource {

    constructor(stock, unitsPerInterval, id) {
        super(stock, unitsPerInterval, id);
    }

    static createFromJSON(json) {
        return new Wood(json._stock, json._unitsPerInterval, json._id);
    }
}