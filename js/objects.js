/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import {lang} from './langColors.js';
export {data, layout, post};

const CONSOLE_INFO = 'color: #0d9c00; background: #0d9c0021; border-radius: 2px; font-size: 15px; font-weight: bold;';

const data = {
    URL: 'https://joseliojunior.github.io/data/post/p',
    async size() {
        let n = 0;
        for (let i = 1; i < 100; i++) {
            if ((await fetch(`${this.URL}${i}.json`)).ok) n++;
            else {
                console.clear();
                console.info(`%c Total pages counted: ${n} `, CONSOLE_INFO);
                break;
            };
        };
        return n;
    }
};

const layout = {
    themePicker(input, output) {
        const KEY = 'io.github.joseliojunior.theme';
        const DARKMODE = 'css/theme-dark.css';
        const LIGHTMODE = 'css/theme-light.css';
        const storedTheme = localStorage.getItem(KEY);

        output.href = storedTheme ?? DARKMODE;
    
        let status = storedTheme == null || storedTheme == DARKMODE ? true : false;
    
        input.addEventListener('click', ()=> {
            if (status) {
                localStorage.setItem(KEY, LIGHTMODE);
                output.href = localStorage.getItem(KEY);
                status = false;
            } else {
                localStorage.setItem(KEY, DARKMODE);
                output.href = localStorage.getItem(KEY);
                status = true;
            };
        });  
    },

    windowContext(postCards) {
        const THRESHOLD = 768;
    
        if (innerWidth > THRESHOLD) {
            for (let i = 0; i < postCards.length; i++) {
                postCards[i].classList = 'flex';
            };
        } else {
            for (let i = 0; i < postCards.length; i++) {
                postCards[i].classList = 'flexblock';
            };
        };
    }
};

const post = {
    blankCard: `<div style="width: 90%; margin: 10px;"><div></div>`,
    buildContent(context, p) {
        document.getElementById(context).innerHTML = `
        ${this.box(
            this.card(p?.c1.title, p?.c1.description, p?.c1.href, p?.c1.tags),
            this.card(p?.c2.title, p?.c2.description, p?.c2.href, p?.c2.tags)
        )}
        ${this.box(
            this.card(p?.c3.title, p?.c3.description, p?.c3.href, p?.c3.tags),
            this.card(p?.c4.title, p?.c4.description, p?.c4.href, p?.c4.tags)
        )}
        ${this.box(
            this.card(p?.c5.title, p?.c5.description, p?.c5.href, p?.c5.tags),
            this.card(p?.c6.title, p?.c6.description, p?.c6.href, p?.c6.tags)
        )}
        ${this.box(
            this.card(p?.c7.title, p?.c7.description, p?.c7.href, p?.c7.tags),
            this.card(p?.c8.title, p?.c8.description, p?.c8.href, p?.c8.tags)
        )}`;
    },
    box(card1, card2) {
        if (card1 == this.blankCard && card2 == this.blankCard)
        return '';

        return `<section name="post-orientation" class="flex"> 
            ${card1 ??= ''}${card2 ??= ''}
        </section>`;
    },
    card(title, description, href, tags) {
        let key = false;

        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] != null) key = true;
        };

        return key ? `<article>
            <section style="margin: 10px;">
                <a href=${href ?? '#'}>
                    <div style="font-size: 1.5rem; font-weight: 700;">
                        ${title ?? ''}
                    </div>
                </a>
                <div style="margin-top: 10px;">
                    ${description ?? ''}
                </div>
                ${this.tag(tags ?? '')}
            </section>
        </article>` : this.blankCard;
    },
    contourColor(color) {
        color ??= 'transparent';
        const c = color[0] == '#' ? color.replace('#', '') : color;
        const rgb = [
            parseInt(`${c[0]}${c[1]}`, 16),
            parseInt(`${c[2]}${c[3]}`, 16),
            parseInt(`${c[4]}${c[5]}`, 16)
        ];
        const BRIGHT = 20;
        return `rgb(${rgb[0] + BRIGHT}, ${rgb[1] + BRIGHT}, ${rgb[2] + BRIGHT})`;
    },
    langSelect(plang) {
        let arr = [];

        for (let i = 0; i < lang.length; i++) {
            if (plang == lang[i][0]) {
                arr.push(lang[i][1]);
                arr.push(lang[i][2]);
            };
        };
        
        return `<div style="margin: 0 4px;">
            <div style="display: inline-block; width: 12px; height: 12px;
            border: solid 1px ${this.contourColor(arr[1])}; border-radius: 100%; background:${arr[1] ??= ''};"></div> ${arr[0] ??= ''}
        </div>`;
    },
    tag(tags) {
        const tagArr = tags.toLowerCase().replace(/\s/g, '').split(',');
        const style = `align-itens: center; justify-content:center; margin: 10px; font-size: 80%; color:var(--tag-description-color);`;
        
        if (tagArr.length > 3)
        return `<div class="flex" style="${style}">
            ${this.langSelect(tagArr[0]) ?? ''}
            ${this.langSelect(tagArr[1]) ?? ''}
            ${this.langSelect(tagArr[2]) ?? ''}
        </div>
        <div class="flex" style="${style}">
            ${this.langSelect(tagArr[3]) ?? ''}
            ${this.langSelect(tagArr[4]) ?? ''}
            ${this.langSelect(tagArr[5]) ?? ''}
        </div>`;

        if (tagArr.length <= 3)
        return `<div class="flex" style="${style}">
            ${this.langSelect(tagArr[0]) ?? ''}
            ${this.langSelect(tagArr[1]) ?? ''}
            ${this.langSelect(tagArr[2]) ?? ''}
        </div>`;

        return null;
    }
};