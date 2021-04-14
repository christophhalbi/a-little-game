
export default class GameObject {

    static objectCounter = 1;

    _moveable = false;

    constructor(id) {
        if (id === undefined) {
            id = GameObject.objectCounter++;
        }

        this._id = id;
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