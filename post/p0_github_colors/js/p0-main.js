/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
`use strict`
import {ly} from '../../../js/clss.js';
import {xcls} from '../../../js/cls.js';
 
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
 
class main {
 
    static slyt() {
         ly.wctx(ids.cbx);
         ly.thpk(ids.stb, ids.tlke);
     };
 
    static async pgs() {

        const dtt = await fetch(`https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml`);

        const res = await dtt.text();
    
        const tRes = `"${res
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
    
        const txcls = (x)=> {
            x = x.replace('#', '');
            const r = parseInt(`${x[0]}${x[1]}`, 16);
            const g = parseInt(`${x[2]}${x[3]}`, 16);
            const b = parseInt(`${x[4]}${x[5]}`, 16);
            const th = 170;
    
            return r > th || g > th || b > th ? 
            xcls.pcls(x, 'hex', 'rgb', null, -0.2, -0.45)
            : xcls.pcls(x, 'hex', 'rgb', null, null, 0.4);
        };

       
    
        for (let i = 0; i < arr.length; i++) {
            const nnd = document.createElement('span');
    
            nnd.innerHTML = `${arr[i][0]}<br>`
            nnd.id = `pc${i}`;
            nnd.style.background = arr[i][1];
            nnd.style.padding = '5px 8px';
            nnd.style.borderRadius = '4px';
            nnd.style.border = `solid 1px ${xcls.pcls(arr[i][1], 'hex', 'rgb', null, null, 0.2)}`;
            nnd.style.margin = '2px';
            nnd.style.flexGrow = '1';
            nnd.style.fontSize = '20px';
            nnd.style.color = txcls(arr[i][1]);
            document.getElementById('color-content').appendChild(nnd);
    
    
            const hxcls = document.createElement('span');
            hxcls.id = `hex${i}`;
            hxcls.style.fontSize = '14px';
    
            nnd.appendChild(hxcls);

            const pcolor = document.getElementById(`pc${i}`);
            const hex = document.getElementById(`hex${i}`);

            let status = true;

            pcolor.addEventListener('click', ()=> {

                if (status) {
                    pcolor.style.flexBasis = '100%';
                    hex.innerHTML = `${arr[i][1]}`.toUpperCase() +
                    `<br>${xcls.ph(arr[i][1], 'rgba')}`.replace(/,/g, ', ') +
                    `<br>${xcls.ph(arr[i][1], 'hsla')}`.replace(/,/g, ', ');
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
 
    static async sdt() {
         await this.pgs();
         this.slyt();
     };
 
    static async lnd() {
         this.sdt();
         
         setTimeout(() => {
             ids.ld.remove();
         }, 500);  
     };
 
    static get init() {
         this.lnd();
         window.addEventListener('resize', this.slyt);
     };
 };
 
main.init;