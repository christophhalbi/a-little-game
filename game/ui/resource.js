
export default class UIResource {

    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    get gameObject() {
        return this._gameObject;
    }

    update() {
        document.querySelector(`*[data-game-object-id="${this._gameObject.id}"] span.stock`).innerHTML = this._gameObject.stock;
    }

    render() {
        return `<div class="ui-resource" data-game-object-id="${this._gameObject.id}">
            <span>${this._gameObject.constructor.name} <span class="stock">${this._gameObject.stock}</span></span>
        </div>`
    }
}