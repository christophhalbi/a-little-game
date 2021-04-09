
export default class UIMapSquare {

    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    render() {
        return `<div class="ui-map-square" data-game-object-id="${this._gameObject.id}">
        </div>`
    }
}