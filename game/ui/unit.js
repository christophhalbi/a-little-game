
export default class UIUnit {

    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    handleEvent(event) {
        const customEvent = new CustomEvent('onUIUnitClicked', { detail: { gameObject: this._gameObject } });
        document.dispatchEvent(customEvent);
    }

    addListener() {
        document.querySelector(`div[data-game-object-id="${this._gameObject.id}"]`).addEventListener('click', this);
    }

    move() {
        document.querySelector(`div[data-game-object-id="${this._gameObject.position.id}"]`).appendChild(document.querySelector(`div[data-game-object-id="${this._gameObject.id}"]`));
    }

    render() {
        return `<div class="ui-unit" data-game-object-id="${this._gameObject.id}">
            <span>${this._gameObject.name}</span>
        </div>`
    }
}