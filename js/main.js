/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import cardsPt_br from '../data/post/cards_pt-br.js';
import cardsEn_us from '../data/post/cards_en-us.js';
import { Layout, Post } from './Classes.js';

const ids = {
    CONTENT: 'content',
    loading: document.getElementById('loading-screen'),
    arrowGo: document.getElementById('arrow-go'),
    arrowBack: document.getElementById('arrow-back'),
    starThemeBtn: document.getElementById('star-theme-btn'),
    themeLinkElement: document.getElementById('theme'),
    numberText: document.getElementById('page-number')
};

class main {

    static setLayout() {
        Layout.themePicker(ids.starThemeBtn, ids.themeLinkElement);
    };

    static async getData() {
        const response = navigator.language == 'pt' ||
        navigator.language == 'pt-BR' ? cardsPt_br :
        navigator.language == 'en' ||
        navigator.language == 'en-US' ? cardsEn_us :
        cardsEn_us;
        Post.makeCard(response, ids.CONTENT);
    };

    static async setData() {
        await this.getData();
        this.setLayout();
    };

    static async loadEnd() {
        this.setData();
        
        setTimeout(() => {
            ids.loading.remove();
        }, 100);  
    };

    static get init() {
        this.loadEnd();
        window.addEventListener('resize', this.setLayout);
    };
};

main.init;