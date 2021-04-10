
export default class UIMapSquare {

    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    handleEvent(event) {
        if (event.which == 3) {
            event.preventDefault();

            const customEvent = new CustomEvent('onUIMoveRequest', { detail: { gameObject: this._gameObject } });
            document.dispatchEvent(customEvent);
        }
    }

    addListener() {
        document.querySelector(`div[data-game-object-id="${this._gameObject.id}"]`).addEventListener('mousedown', this);
    }

    render() {
        return `<div class="ui-map-square" data-game-object-id="${this._gameObject.id}">
        </div>`
    }
}