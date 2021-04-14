
import Resource from './../resource.js';

export default class Food extends Resource {

    constructor(stock, unitsPerInterval, id) {
        super(stock, unitsPerInterval, id);
    }

    static createFromJSON(json) {
        return new Food(json._stock, json._unitsPerInterval, json._id);
    }
}