/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import cards1 from '../data/post/cards1.js';
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

const pagesDef = {
    index: 1,
    length: 1
};

class main {

    static setLayout() {
        Layout.themePicker(ids.starThemeBtn, ids.themeLinkElement);
    };

    static pageSelector(element, direction) {
        element.addEventListener('click', async ()=> {
            if (direction && pagesDef.index < pagesDef.length)
            pagesDef.index++;

            if (!direction && pagesDef.index > 1)
            pagesDef.index--;

            await this.getData(pagesDef.index);
            ids.numberText.innerHTML = pagesDef.index;
        });
    };

    static selector(goAhead, goBack) {
        this.pageSelector(goAhead, true);
        this.pageSelector(goBack, false);
    };

    static async getData() {
        const response = cards1;
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
        this.selector(ids.arrowGo, ids.arrowBack);
    };
};

main.init;