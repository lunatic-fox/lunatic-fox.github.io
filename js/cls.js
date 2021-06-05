/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */
import {ccls} from './ccls.js';
export class xcls {

    static async ghc() {
        const data = await fetch(`https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml`);

        const res = await data.text();
    
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
            arr.push([tRes[i].toLowerCase() ,tRes[i], tRes[i+1]]);
            i++;
        };
    
        return arr;
    };

    static pcls(cls, f, t, a, s, l) {
    
        if (cls == null)
        return 'transparent';
    
        if (![...arguments].splice(0, 3).every(x => typeof x === 'string'))
        throw new Error(`\n\nArguments 'color', 'from' and 'to' must be type string!\n`);
    
        if (f === t)
        throw new Error(`\n\nArgument 'from' can't be the same as 'to'!\n`);
    
        if (!arguments[1].match(/hex|css|rgb|hsl/))
        throw new Error(`\n\nArgument 'from' must be: hex, rgb, rgba, hsl, hsla or css!\n`);
    
        if (!arguments[2].match(/hex|rgb|hsl/))
        throw new Error(`\n\nArgument 'to' must be: hex, rgb, rgba, hsl or hsla!\n`);
    
        if (![...arguments].splice(3, 5).every(x => typeof x === 'number' || x == null && x >= 0 && x <= 1))
        throw new Error(`\n\nArguments 'opacity', 'saturation' and 'lightness' should be a number between 0 and 1 or null!\n`);
    
        if (arguments.length > 6)
        throw new Error(`\n\nInvalid argument!\n`);
    
        a ??= 0;
        s ??= 0;
        l ??= 0;
    
        const cc = this.pck(cls, f === 'hsl' ? 'hsla' : f === 'rgb' ? 'rgba' : f);

        if (cc == null)
        throw 'cc error';

        const c = f === 'rgb' ? this.pr(cc, 'hsla') 
        : f === 'css' ? this.pcs(cc, 'hsl')
        : f === 'hex' ? this.ph(cc, 'hsla')
        : cc;
    
        const p = c.replace(/hsla|hsl|\(|\)|\%/g, '').split(',');
    
        const nS = Math.round(+p[1] + s * 100);

        const nL = Math.round(+p[2] + l * 100);
    
        const nv = 
            a !== 0 ? 
            `hsla(${p[0]},${
                nS < 0 ? 0 : nS > 100 ? 100 : nS
            }%,${
                nL < 0 ? 0 : nL > 100 ? 100 : nL
            }%, ${a.toFixed(1)})`
    
            : `hsl(${p[0]},${
                nS < 0 ? 0 : nS > 100 ? 100 : nS
            }%,${
                nL < 0 ? 0 : nL > 100 ? 100 : nL
            }%)`; 
    
     
        switch (t) {
            case 'rgb':
                return this.phs(nv, 'rgba');
        
            case 'hex':
                return this.phs(nv, 'hex');
        
            default:
                return nv;
        };
    
    };

    static ph(cls, o) { 
        
        o ??= 'rgba';

        if (cls == null) 
        return 'rgba(0,0,0,0)';

        if (o === 'rgba') {
            const cc = this.pck(cls, 'hex');

            if (cc == null)
            throw this.err(cls, 'hex');

            let arr = [];
            
            switch (cc.length) {
                case 3: 
                    for (let i = 0; i < cc.length; i++) {
                        const pn = Math.round(parseInt(cc[i].repeat(2), 16));
                        pn >= 255 ? arr.push(255) : pn <= 0 ? arr.push(0) : arr.push(pn);
                    };
                    return `rgb(${arr})`;

                case 4:
                    const ap4 = parseInt(cc[3].repeat(2), 16) / 255; 

                    const a4 = ap4 > 0 && ap4 < 1 ? ap4.toFixed(1) : ap4;

                    for (let i = 0; i < cc.length - 1; i++) {
                        const pn = Math.round(parseInt(cc[i].repeat(2), 16));
                        pn >= 255 ? arr.push(255) : pn <= 0 ? arr.push(0) : arr.push(pn);
                    };
                    
                    return `rgba(${arr},${a4})`;

                case 6: 
                    for (let i = 0; i < cc.length; i++) {
                        const pn = Math.round(parseInt(cc.slice(i++).slice(0, 2), 16));
                        pn >= 255 ? arr.push(255) : pn <= 0 ? arr.push(0) : arr.push(pn);
                    };
                    return `rgb(${arr})`;

                case 8:
                    const ap8 = parseInt(`${cc[6]}${cc[7]}`, 16) / 255;

                    const a8 = ap8 > 0 && ap8 < 1 ? ap8.toFixed(1) : ap8;

                    for (let i = 0; i < cc.length - 2; i++) {
                        const pn = Math.round(parseInt(cc.slice(i++).slice(0, 2), 16));
                        pn >= 255 ? arr.push(255) : pn <= 0 ? arr.push(0) : arr.push(pn);
                    };
                
                    return `rgba(${arr},${a8})`;

                default: 
                    break;
            };
        };

        if (o === 'hsla') {
            const cc = this.ph(cls, 'rgba');
            return this.pr(cc, 'hsla');
        };

        return this.err(null, 'flag');

    };

    static pr(cls, o) {

        o ??= 'hex';

        if (cls == null) 
        return '#00000000';

        const cc = this.pck(cls, 'rgba');

        if (cc == null)
        throw this.err(cls, 'rgba');

        if (o === 'hex') {

            const c = cc.split(',');

            if (c.length === 3) {
                const arr = c.map(x => {
                    const n = Math.round(parseInt(x));
                    return n <= 0 ? '00' 
                    : n < 16 ? `0${n.toString(16)}` 
                    : n > 255 ? 'ff' : n.toString(16);
                });

                return `#${arr}`.replace(/,/g, '');
            };

            const arr = c.splice(0,3).map(value => {
                const n = Math.round(parseInt(value));
                return n <= 0 ? '00' : n < 16 ? `0${n.toString(16)}` : n > 255 ? 'ff' : n.toString(16);
            });

            const a = Math.round((c.pop() * 255)).toString(16);
        
            return `#${arr}${a}`.replace(/,/g, '');

        };

        if (o === 'hsla') {

            const arr = cc.split(',');
            const a = arr[3];

            if (a < 0 || a > 1)
            throw this.err(cls, 'rgba');

            const c = arr.length === 3 ? arr.map(v =>  v / 255) : arr.splice(0,3).map(v =>  v / 255);
            const cma = Math.max(...c);
            const cmi = Math.min(...c);
            const d = cma - cmi;

            const h = d === 0 ? 0 :
            cma == c[0] ? 60 * (((c[1] - c[2]) / d) % 6 ) :
            cma == c[1] ? 60 * (((c[2] - c[0]) / d) + 2 ) :
            60 * (((c[0] - c[1]) / d) + 4 );

            const H = h < 0 ? 360 + h : h;

            const L = (cma + cmi) / 2;

            const S = d === 0 ? 0 : d / (1 - Math.abs(2 * L - 1));

            if (arr.length === 3)
            return `hsl(${Math.round(H)},${Math.round(S * 100)}%,${Math.round(L * 100)}%)`;
                
            return `hsla(${Math.round(H)},${Math.round(S * 100)}%,${Math.round(L * 100)}%,${a})`;

        };

        return this.err(null, 'flag');

    };

    static phs(cls, o) {

        o ??= 'rgba';

        if (cls == null) 
        return 'rgba(0,0,0,0)';

        if (o === 'rgba') {

            const cc = this.pck(cls, 'hsla');

            if (cc == null)
            throw this.err(cls, 'hsla');

            const arr = cc.replace(/\%/g, '').split(',');
            const a = arr[3];

            if (a < 0 || a > 1)
            throw this.err(cls, 'hsla');

            const c = arr.length === 3 ? arr : arr.splice(0,3);

            const H = c[0];
            const S = c[1] / 100;
            const L = c[2] / 100;

            const Y = (1 - Math.abs(2 * L -1)) * S;
            const X = Y * (1 - Math.abs((H / 60) % 2 - 1) );
            const m = L - Y / 2;

            const _r = H >= 0 && H < 60 ? [Y, X, 0]
            : H >= 60 && H < 120 ? [X, Y, 0]
            : H >= 120 && H < 180 ? [0, Y, X]
            : H >= 180 && H < 240 ? [0, X, Y]
            : H >= 240 && H < 300 ? [X, 0, Y]
            : [Y, 0, X];

            const r = _r.map(x => Math.round((x + m) * 255));
            
            if (arr.length === 3)
            return `rgb(${r})`;

            return `rgba(${r},${a})`;

        };

        if (o === 'hex') {

            const cc = this.phs(cls, 'rgba');
            return this.pr(cc, 'hex');

        };

        return this.err(null, 'flag');

    };

    static pcs(cls, o) {

        if (cls == null)
        return 'transparent';

        o ??= 'hex';

        if (!o.match(/^(hex|rgb|hsl)$/))
        return this.err(null, 'flag');

        const cc = this.pck(cls, 'css');

        if (cc == null)
        throw this.err(cls, 'css');

        for (let i = 0; i < ccls.length; i++) {

            if (o == 'rgb' && cc == ccls[i][0])
            return this.ph(ccls[i][1], 'rgba');

            if (o == 'hsl' && cc == ccls[i][0])
            return this.ph(ccls[i][1], 'hsla');

            if (o == 'hex' && cc == ccls[i][0])
            return ccls[i][1];

        };

        throw this.err(cls, 'css');

    };

    static pck(p, t) {

        if (typeof p !== 'string')
        throw new Error(`\n\n?\n`);
        
        const cws = p.replace(/\s/g, '');

        switch (t) {
            case 'hex':
                if (!cws.match(/^#*([a-f_0-9]{3,4}|[a-f_0-9]{6}|[a-f_0-9]{8})$/ig))
                return null;
                return cws.replace('#', '').toLowerCase();
            
            case 'rgba':
                if (!cws
                    .match(/^(rgba\((\d+,){3}(\d+|\d+\.\d+)\)|rgb\((\d+,){2}\d+\)|\((\d+,){3}\d+\)|\((\d+,){2}\d+\)|(\d+,){3}(\d+|\d+\.\d+)|(\d+,){2}\d+)$/ig)
                ) 
                return null;
                return cws.replace(/[rgba\(\)]/g, '');
            
            case 'hsla':
                if (!cws.replace(/\%/g, '')
                    .match(/^(hsla\((\d+,){3}(\d+|\d+\.\d+)\)|hsl\((\d+,){2}\d+\)|\((\d+,){3}\d+\)|\((\d+,){2}\d+\)|(\d+,){3}(\d+|\d+\.\d+)|(\d+,){2}\d+)$/ig)
                ) 
                return null;
                return cws.replace(/[hsla\(\)\%]/g, '');
            
            case 'css':
                if (cws.match(/[^a-z]/ig))
                return null;
                return cws.toLowerCase();
        
            default:
                return this.err();
        }

    };

    static err(cls, pt) {

        const derr = new Error(`\n\n?\n`);

        if (arguments.length < 2)
        throw derr;
        
        const tm = '?';

        if (cls == null && pt === 'flag')
        throw new Error(`\n?\n`);

        if (tm == null)
        throw derr;

        return new Error(`\n?\n`);

    };

};