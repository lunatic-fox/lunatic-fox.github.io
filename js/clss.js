/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import {xcls} from './cls.js';
const ghcls = await xcls.ghc();

const cInf = `color: #0d9c00;background: #0d9c0021;border-radius: 2px;font-size: 15px;font-weight: bold;`;

export const dt = {
    URL: 'https://joseliojunior.github.io/data/post/p',
    async sz() {
        let n = 0;
        for (let i = 1; i < 100; i++) {
            if ((await fetch(`${this.URL}${i}.json`)).ok) n++;
            console.info(`%c Total pages counted: ${n} `, cInf);
            break;
        };
        return n;
    }
};

export class ly {
    
    static thpk(i, o) {
        const k = 'io.github.joseliojunior.theme';
        const dm = 'css/theme-dark.css';
        const lm = 'css/theme-light.css';
        const sth = localStorage.getItem(k);

        o.href = sth ?? dm;
    
        let stts = sth == null || sth == dm ? true : false;
    
        i.addEventListener('click', ()=> {
            if (stts) {
                localStorage.setItem(k, lm);
                o.href = localStorage.getItem(k);
                stts = false;
            } else {
                localStorage.setItem(k, dm);
                o.href = localStorage.getItem(k);
                stts = true;
            };
        });  
    };

    static wctx(postCards) {
        const thd = 768;
    
        if (innerWidth > thd) {
            for (let j = 0; j < postCards.length; j++) {
                postCards[j].classList = 'flex';
            };
        } else {
            for (let j = 0; j < postCards.length; j++) {
                postCards[j].classList = 'flexblock';
            };
        };
    };
};


export class pst extends xcls {

    static bkc = `<div style="width: 90%; margin: 10px;"><div></div>`;

    static bx(c1, c2) {
        if (c1 == this.bkc && c2 == this.bkc)
        return '';

        return `<section name="post-orientation" class="flex"> 
            ${c1 ??= ''}${c2 ??= ''}
        </section>`;
    };

    static crd(tt, dscp, hf, tg) {
        let kk = false;

        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] != null) kk = true;
        };

        return kk ? `<article>
            <section style="margin: 10px;">
                <a href=${hf ?? '#'}>
                    <div style="font-size: 1.5rem; font-weight: 700;">
                        ${tt ?? ''}
                    </div>
                </a>
                <div style="margin-top: 10px;">
                    ${dscp ?? ''}
                </div>
                ${this.tgm(tg ?? '')}
            </section>
        </article>` : this.bkc;
    };


    static lsct(plg) {

        let arr = [];

        for (let i = 0; i < ghcls.length; i++) {
            if (plg?.toLowerCase() == ghcls[i][0]) {
                arr.push(ghcls[i][1], ghcls[i][2]);
            };
        };

        if (plg != null) {
            arr.push(plg, '#DDDDDD');
        };

        return `<div style="margin: 0 4px;">
            <div style="display: inline-block; width: 12px; height: 12px;
            border: solid 1px ${this.pcls(arr[1], 'hex', 'hsl', 0, 0, 0.1)};
            border-radius: 100%; background:${arr[1] ??= ''};"></div> ${arr[0] ??= ''}
        </div>`;
    };


    static tgm(ttg) {
        const tArr = ttg.replace(/\s/g, '').split(',');
        const st = `align-itens: center; justify-content:center; margin: 10px; font-size: 80%; color:var(--tag-description-color);`;
        
        if (tArr.length > 3)
        return `<div class="flex" style="${st}">
            ${this.lsct(tArr[0]) ?? ''}
            ${this.lsct(tArr[1]) ?? ''}
            ${this.lsct(tArr[2]) ?? ''}
        </div>
        <div class="flex" style="${st}">
            ${this.lsct(tArr[3]) ?? ''}
            ${this.lsct(tArr[4]) ?? ''}
            ${this.lsct(tArr[5]) ?? ''}
        </div>`;

        if (tArr.length <= 3)
        return `<div class="flex" style="${st}">
            ${this.lsct(tArr[0]) ?? ''}
            ${this.lsct(tArr[1]) ?? ''}
            ${this.lsct(tArr[2]) ?? ''}
        </div>`;

        return null;
    };

    static go(p) {
        return `
        ${this.bx(
            this.crd(p?.c8.title, p?.c8.description, p?.c8.href, p?.c8.tags),
            this.crd(p?.c7.title, p?.c7.description, p?.c7.href, p?.c7.tags)
        )}
        ${this.bx(
            this.crd(p?.c6.title, p?.c6.description, p?.c6.href, p?.c6.tags),
            this.crd(p?.c5.title, p?.c5.description, p?.c5.href, p?.c5.tags)
        )}
        ${this.bx(
            this.crd(p?.c4.title, p?.c4.description, p?.c4.href, p?.c4.tags),
            this.crd(p?.c3.title, p?.c3.description, p?.c3.href, p?.c3.tags)
        )}
        ${this.bx(
            this.crd(p?.c2.title, p?.c2.description, p?.c2.href, p?.c2.tags),
            this.crd(p?.c1.title, p?.c1.description, p?.c1.href, p?.c1.tags)
        )}`;
    };
};