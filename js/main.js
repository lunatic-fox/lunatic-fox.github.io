/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import {dt, ly, pst} from './clss.js';

const ids = {
    ctnt: 'content',
    ld: document.getElementById('loading-screen'),
    awg: document.getElementById('arrow-go'),
    awb: document.getElementById('arrow-back'),
    stb: document.getElementById('star-theme-btn'),
    tlke: document.getElementById('theme'),
    cbx: document.getElementsByName('post-orientation'),
    ntx: document.getElementById('page-number'),
};

const pagesDef = {
    ix: 1,
    lgt: await dt.sz()
};

class main {

    static slyt() {
        ly.wctx(ids.cbx);
        ly.thpk(ids.stb, ids.tlke);
    };

    static pgs(element, direction) {
        element.addEventListener('click', async ()=> {
            if (direction && pagesDef.ix < pagesDef.lgt)
            pagesDef.ix++;

            if (!direction && pagesDef.ix > 1)
            pagesDef.ix--;

            await this.gdt(pagesDef.ix);
            ids.ntx.innerHTML = pagesDef.ix;
            ly.wctx(ids.cbx);
        });
    };

    static slct(goAhead, goBack) {
        this.pgs(goAhead, true);
        this.pgs(goBack, false);
    };

    static async gdt(page) {
        const url = `${dt.URL}${page ??= 1}.json`;
        const cptdt = await fetch(url);

        const res = await cptdt.json();
        
        document.getElementById(ids.ctnt).innerHTML = pst.go(res);
    };

    static async sdt() {
        await this.gdt();
        this.slyt();
    };

    static async lnd() {
        this.sdt();
        
        setTimeout(() => {
            ids.ld.remove();
        }, 100);  
    };

    static get init() {
        this.lnd();
        window.addEventListener('resize', this.slyt);
        this.slct(ids.awg, ids.awb);
    };
};

main.init;