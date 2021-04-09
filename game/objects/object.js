
export default class GameObject {

    static objectCounter = 1;

    constructor() {
        this._id = GameObject.objectCounter++;
    }

    get id() {
        return this._id;
    }

    fireCustomEvent(eventName, detail) {
        const event = new CustomEvent(eventName, detail);
        document.dispatchEvent(event);
    }
}