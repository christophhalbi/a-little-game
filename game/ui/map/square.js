
export default class UIMapSquare {

    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    get gameObject() {
        return this._gameObject;
    }

    render() {
        return `<div class="ui-map-source" data-game-object-id="${this._gameObject.id}">
        </div>`
    }
}