
export default class UIBuilding {

    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    handleEvent(event) {
        const customEvent = new CustomEvent('onUIBuildingClicked', { detail: { gameObject: this._gameObject } });
        document.dispatchEvent(customEvent);
    }

    addClickListener() {
        document.querySelector(`div[data-game-object-id="${this._gameObject.id}"]`).addEventListener('click', this);
    }

    render() {
        return `<div class="ui-bulding" data-game-object-id="${this._gameObject.id}">
            <span>${this._gameObject.name}</span>
        </div>`
    }
}