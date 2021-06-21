/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import { Layout } from '../../../js/Classes.js';
import { Game, GameTitleScreen } from './game.js';

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






Game.titleScreen;
//Game.main;





// const gameTranslation = {
//     newGame: document.getElementById('new-game-btn'),
//     language: document.getElementById('language-game-btn'),
//     quit: document.getElementById('quit-game-btn'),
//     starGithub: document.getElementById('github-msg')
// };

// function gEn() {
//     gameTranslation.newGame.innerHTML = 'new game';
//     gameTranslation.language.innerHTML = 'language';
//     gameTranslation.quit.innerHTML = 'quit';
//     gameTranslation.starGithub.innerHTML = 'Star me on Github';
// };

// function gPt() {
//     gameTranslation.newGame.innerHTML = 'novo jogo';
//     gameTranslation.language.innerHTML = 'idioma';
//     gameTranslation.quit.innerHTML = 'sair';
//     gameTranslation.starGithub.innerHTML = 'Favorite-me no Github';
// };


// function gameLanguage(lang) {
//     if (lang == 'pt') gPt();
//     if (lang == 'en') gEn();
// };


// if (navigator.language == 'pt') {
//     gPt();
// } else {
//     gEn();
// };





// let swstatus = true;

// document.getElementById('language-game-btn').addEventListener('click', ()=> {

//     if (swstatus) {
//         gameLanguage('en');
//         swstatus = false;
//     } else {
//         gameLanguage('pt');
//         swstatus = true;
//     };

// });
