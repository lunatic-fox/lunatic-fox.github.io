import {data, layout, post} from './classes.js';

const def = {
    starThemeBtn : document.getElementById('star-theme-btn'),
    themeLinkElement : document.getElementById('theme'),
    cardBoxesOrientation : document.getElementsByName('post-orientation'),
    pageStatus : 1,
    pageMax : await data.size()
};

class main {

    static setLayout() {
        layout.windowContext(def.cardBoxesOrientation);
        layout.themePicker(def.starThemeBtn, def.themeLinkElement);
        layout.footer;
    };

    static pageSelector(element, direction) {
        element.addEventListener('click', async ()=> {
            if (direction && def.pageStatus < def.pageMax) def.pageStatus++;

            if (!direction && def.pageStatus > 1)  def.pageStatus--;

            await this.getData(def.pageStatus);
            layout.windowContext(def.cardBoxesOrientation);
        });
    };

    static selector(goAhead, goBack) {
        this.pageSelector(goAhead, true);
        this.pageSelector(goBack, false);
    };

    static async getData(page) {
        const url = `http://joseliojunior.github.io/data/post/p${page ??= 1}.json`;
        const data = await fetch(url);
    
        if (data.status == 404)
        return post.error('content');
    
        const response = await data.json();
        return post.page('content', response);
    };
    
    static async setData() {
        await this.getData();
        this.setLayout();    
    };    

    static async loadEnd() {
        await this.setData();
        return document.getElementById('transition').remove();
    };

    static init = this.loadEnd();
    static resize = window.addEventListener('resize', this.setLayout);
    static select =  this.selector(document.getElementById('pagego'), document.getElementById('pageback'));
};

main.init;
main.resize;
main.select;