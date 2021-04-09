
export default class UIUnit {

    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    render() {
        return `<div class="ui-unit">
            <span>Unit</span>
        </div>`
    }
}