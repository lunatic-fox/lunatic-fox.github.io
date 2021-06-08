/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import {data, Layout, Post} from './Classes.js';

const ids = {
    CONTENT: 'content',
    loading: document.getElementById('loading-screen'),
    arrowGo: document.getElementById('arrow-go'),
    arrowBack: document.getElementById('arrow-back'),
    starThemeBtn: document.getElementById('star-theme-btn'),
    themeLinkElement: document.getElementById('theme'),
    // cardBoxes: document.getElementsByName('post-orientation'),
    numberText: document.getElementById('page-number')
};

const pagesDef = {
    index: 1,
    length: await data.size()
};

class main {

    static setLayout() {
        // Layout.windowContext(ids.cardBoxes);
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
            // Layout.windowContext(ids.cardBoxes);
        });
    };

    static selector(goAhead, goBack) {
        this.pageSelector(goAhead, true);
        this.pageSelector(goBack, false);
    };

    static async getData(page) {
        // const url = `https://joseliojunior.github.io/data/post/cards.json`;


        const url = `${data.URL}${page ??= 1}.json`;
        

        const capturedData = await fetch(url);

        const response = await capturedData.json();
        Post.makeCard(response, 'content');
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