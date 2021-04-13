
export default class GameObject {

    static objectCounter = 1;

    _moveable = false;

    constructor() {
        this._id = GameObject.objectCounter++;
    }

    get moveable() {
        return this._moveable;
    }

    get id() {
        return this._id;
    }

    canHoldUnits() {
        return false;
    }

    canProduceUnits() {
        return false;
    }

    fireCustomEvent(eventName, detail) {
        const event = new CustomEvent(eventName, detail);
        document.dispatchEvent(event);
    }
}