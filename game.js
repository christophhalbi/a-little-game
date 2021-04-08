
import GameData from './game/data.js';
import UISidebar from './game/ui_sidebar.js';
import UIContent from './game/ui_content.js';

export default class Game {

    constructor(targetNode) {
        this.targetNode = targetNode;

        this.data = new GameData();

        this.sidebar = new UISidebar();
        this.content = new UIContent();

        this.targetNode.insertAdjacentHTML('beforeend', this.render());
    }

    render() {
        return `<div>
            ${this.sidebar.render()}
            ${this.content.render()}
        </div>`;
    }
}