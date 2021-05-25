/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import {data, layout, post} from './objects.js';

const ids = {
    CONTENT: 'content',
    loading: document.getElementById('loading-screen'),
    arrowGo: document.getElementById('arrow-go'),
    arrowBack: document.getElementById('arrow-back'),
    starThemeBtn: document.getElementById('star-theme-btn'),
    themeLinkElement: document.getElementById('theme'),
    cardBoxes: document.getElementsByName('post-orientation'),
    numberText: document.getElementById('page-number'),
};

const pagesDef = {
    index: 1,
    length: await data.size()
};

const main = {
    init() {
        this.loadEnd();
        window.addEventListener('resize', this.setLayout);
        this.selector(ids.arrowGo, ids.arrowBack);
    },
    setLayout() {
        layout.windowContext(ids.cardBoxes);
        layout.themePicker(ids.starThemeBtn, ids.themeLinkElement);
    },
    pageSelector(element, direction) {
        element.addEventListener('click', async ()=> {
            if (direction && pagesDef.index < pagesDef.length)
            pagesDef.index++;

            if (!direction && pagesDef.index > 1)
            pagesDef.index--;

            await this.getData(pagesDef.index);
            ids.numberText.innerHTML = pagesDef.index;
            layout.windowContext(ids.cardBoxes);
        });
    },
    selector(goAhead, goBack) {
        this.pageSelector(goAhead, true);
        this.pageSelector(goBack, false);
    },
    async getData(page) {
        const url = `${data.URL}${page ??= 1}.json`;
        const capturedData = await fetch(url);

        const response = await capturedData.json();
        return post.buildContent(ids.CONTENT, response);
    },
    async setData() {
        await this.getData();
        this.setLayout(); 
    },
    async loadEnd() {
        await this.setData();
        return ids.loading.remove();
    }
};

main.init();