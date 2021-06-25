/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import {Color} from './Color.js';
export const githubColors = await Color.github();

const C_INFO = `
    color: #0d9c00;
    border-radius: 2px;
    font-size: 15px; 
    font-weight: bold;`;

export class Layout {

    static themePicker(input, output) {
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
    };

    static windowContext(postCards) {
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
    };
};

export class Post extends Color {

        static makeCard(data, output) {
        
        const arr = [];

        for (let i = 0; i < data.length; i++) {
            arr.push(this.card(
                data[i]?.title,
                data[i]?.href,
                data[i]?.description,
                data[i]?.tags)
            );
        };
        document.getElementById(output).innerHTML = arr.toString().replace(/>,/gm, '>');
    };

    static card(title, href, description, tags) {       

        const arr = [];

        const tagArr = tags?.replace(/\s/g, '').split(',');

        for (let j = 0; j < tagArr.length; j++) {
            for (let i = 0; i < githubColors.length; i++) {
                if (githubColors[i][0] == tagArr[j]) 
                arr.push([githubColors[i][1], githubColors[i][2]]);            
            };
        };

        tagArr.filter((x, i)=> x != arr.map(y => y[0].toLowerCase())[i]).map(x => arr.push([x, '#dddddd']));

        const tagWrapperStr = [];

        for (let i = 0; i < arr.length; i++) {

            const tags = `
            <div class="c-tag-box">
                <div class="c-tag" style="border: solid 1px ${
                    this.parseColor(arr[i][1], 'hex', 'rgb', null, null, 0.15)
                }; background:${arr[i][1]}"></div>
                <span>${arr[i][0]}</span>
            </div>`;

            tagWrapperStr.push(tags);

        };

        const htmlString = `
        <article>
            <a href="${href ?? '#'}">
                <div class="c-title">${title ?? ''}</div>
            </a>
            <div class="c-description">${description ?? ''}</div>
            <div class="c-tag-wrapper">
                ${tagWrapperStr.toString().replace(/^\s+\,$/gm, '')}
            </div>
        </article>`;

        return htmlString;
    };
    
};