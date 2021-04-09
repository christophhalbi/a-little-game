
export default class UISelection {

    constructor() {
        this._id = 'ui-selection';
    }

    update(gameObject) {
        document.querySelector(`#${this._id} div`).innerHTML = gameObject.name;
    }

    render() {
        return `<div id="${this._id}">
            <span>Selection</span>
            <div>
            </div>
        </div>`
    }
}