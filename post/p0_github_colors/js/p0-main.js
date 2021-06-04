/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import {Layout} from '../../../js/classes.js';
import {Color} from '../../../js/cls.js';
 
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
 
class main {
 
    static setLayout() {
         Layout.windowContext(ids.cardBoxes);
         Layout.themePicker(ids.starThemeBtn, ids.themeLinkElement);
     };
 
    static async getData() {

        const data = await fetch(`https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml`);

        const response = await data.text();
    
        const tRes = `"${response
            .replace(/^(\#.*|---)/gim, '')
            .replace(/^\s{2}(?!color).*/gim, '')
            .replace(/color:/gim, '')
            .replace(/:\s+"#/gim, '","#')
            .replace(/.*:/gim, '')
            .replace(/\"\s+/gim, '","')
            .replace(/","$/, '')}"
            `.split(',')
             .map(x => x.replace(/\n|"/g, ''));
    
        let arr = [];
    
        for (let i = 0; i < tRes.length; i++) {
            arr.push([tRes[i], tRes[i+1]]);
            i++;
        };
    
        const textColor = (x)=> {
            x = x.replace('#', '');
            const r = parseInt(`${x[0]}${x[1]}`, 16);
            const g = parseInt(`${x[2]}${x[3]}`, 16);
            const b = parseInt(`${x[4]}${x[5]}`, 16);
            const th = 170;
    
            return r > th || g > th || b > th ? 
            Color.pcls(x, 'hex', 'rgb', null, -0.2, -0.45)
            : Color.pcls(x, 'hex', 'rgb', null, null, 0.4);
        };

       
    
        for (let i = 0; i < arr.length; i++) {
            const node = document.createElement('span');
    
            node.innerHTML = `${arr[i][0]}<br>`
            node.id = `pc${i}`;
            node.style.background = arr[i][1];
            node.style.padding = '5px 8px';
            node.style.borderRadius = '4px';
            node.style.border = `solid 1px ${Color.pcls(arr[i][1], 'hex', 'rgb', null, null, 0.2)}`;
            node.style.margin = '2px';
            node.style.flexGrow = '1';
            node.style.fontSize = '20px';
            node.style.color = textColor(arr[i][1]);
            document.getElementById('color-content').appendChild(node);
    
    
            const hexColor = document.createElement('span');
            hexColor.id = `hex${i}`;
            hexColor.style.fontSize = '14px';
    
            node.appendChild(hexColor);

            const pcolor = document.getElementById(`pc${i}`);
            const hex = document.getElementById(`hex${i}`);

            let status = true;

            pcolor.addEventListener('click', ()=> {

                if (status) {
                    pcolor.style.flexBasis = '100%';
                    hex.innerHTML = `${arr[i][1]}`.toUpperCase() +
                    `<br>${Color.ph(arr[i][1], 'rgba')}`.replace(/,/g, ', ') +
                    `<br>${Color.ph(arr[i][1], 'hsla')}`.replace(/,/g, ', ');
                    status = false;
                } else {
                    pcolor.style.flexBasis = 'auto';
                    hex.innerHTML = '';
                    status = true;
                };
            });
            
        };

        document.getElementById('lang-number').innerHTML = `Languages total number: ${arr.length}`;
        
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