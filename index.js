
import Game from './game.js';

document.addEventListener('DOMContentLoaded', (event) => {

    window.game = new Game(document.querySelector('#game'));
});