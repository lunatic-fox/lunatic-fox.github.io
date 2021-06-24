/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import { Layout } from '../../../js/Classes.js';
import { Game } from './game.js';

const ids = {
    content: document.getElementById('content'),
    newGame: document.getElementById('new-game'),


    loading: document.getElementById('loading-screen'),
    starThemeBtn: document.getElementById('star-theme-btn'),
    themeLinkElement: document.getElementById('theme')
};

class main {

    static setLayout() {
        Layout.themePicker(ids.starThemeBtn, ids.themeLinkElement);
    };

    static async getData() {
        //
    };

    static async setData() {
        await this.getData();
        this.setLayout();
    };

    static async loadEnd() {
        this.setData();
        
        setTimeout(() => {
            ids.loading.remove();
        }, 500);  
    };

    static get init() {
        this.loadEnd();
        window.addEventListener('resize', this.setLayout);
    };
};

main.init;


import { InGame } from './inGame.js';

//GameTimer.newTimer();

// ids.content.style.display = 'flex';
// Game.main;

//Game.directInit();

Game.init();

