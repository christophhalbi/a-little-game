
export default class UISelection {

    constructor() {
        this._id = 'ui-selection';
    }

    update() {
        document.querySelector(`#${this._id} div`).innerHTML = this._gameObject.name;
    }

    get() {
        return this._gameObject;
    }

    set(gameObject) {
        this._gameObject = gameObject;
    }

    render() {
        return `<div id="${this._id}">
            <span>Selection</span>
            <div>
            </div>
        </div>`
    }
}