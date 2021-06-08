const jsDoc_flags = 'hex'||'rgba'||'hsla'||'css';
const jsDoc_parseColorFrom = 'hex'||'rgb'||'hsl'||'css';
const jsDoc_parseColorTo = 'hex'||'rgb'||'hsl';
const jsDoc_parseHEXFlags = 'rgba'||'hsla';
const jsDoc_parseRGBAFlags = 'hex'||'hsla';
const jsDoc_parseHSLAFlags = 'rgba'||'hex';
const jsDoc_parseCSSColorFlags = 'hex'||'rgb'||'hsl';

export class Color {

    static async github() {
        const data = await fetch(`https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml`);

        const response = await data.text();
    
        const tRes = `"${response
            .replace(/^(\#.*|---)/gim, '')
            .replace(/^\s{2}(?!color).*/gim, '')
            .replace(/color:/gim, '')
            .replace(/:\s+"#/gim, '","#')
            .replace(/.*:/gim, '')
            .replace(/\"\s+/gim, '","')
            .replace(/","$/, '')}"`
                .split(',')
                .map(x => x.replace(/\n|"/g, ''));
    
        let arr = [];
    
        for (let i = 0; i < tRes.length; i++) {
            arr.push([tRes[i].toLowerCase() ,tRes[i], tRes[i+1]]);
            i++;
        };
    
        return arr;
    };

    /**
     * @param {string?} I
     * @param {jsDoc_parseColorFrom} IFlag
     * @param {jsDoc_parseColorTo} O
     * @param {number?} a
     * @param {number?} s
     * @param {number?} l
     */
    static parseColor(I, IFlag, O, a, s, l) {
    
        if (I == null)
        return 'transparent';
    
        if (![...arguments].splice(0, 3).every(x => typeof x === 'string'))
        throw new Error('');
    
        if (IFlag === O)
        throw new Error('');
    
        if (!arguments[1].match(/hex|css|rgb|hsl/))
        throw new Error('');
    
        if (!arguments[2].match(/hex|rgb|hsl/))
        throw new Error('');
    
        if (![...arguments].splice(3, 5).every(x => typeof x === 'number' || x == null && x >= 0 && x <= 1))
        throw new Error('');
    
        if (arguments.length > 6)
        throw new Error('');
    
        a ??= 0;
        s ??= 0;
        l ??= 0;
    
        const cc = this.patternChecker(I, IFlag === 'hsl' ? 'hsla' : IFlag === 'rgb' ? 'rgba' : IFlag);

        if (cc == null)
        throw new Error('cc error');

        const c = IFlag === 'rgb' ? this.parseRGBA(cc, 'hsla') 
        : IFlag === 'css' ? this.parseCSS(cc, 'hsl')
        : IFlag === 'hex' ? this.parseHEX(cc, 'hsla')
        : cc;
    
        const p = c.replace(/hsla|hsl|\(|\)|\%/g, '').split(',');
    
        const nS = Math.round(+p[1] + s * 100);

        const nL = Math.round(+p[2] + l * 100);
    
        const newValue = 
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
    
     
        switch (O) {
            case 'rgb':
                return this.parseHSLA(newValue, 'rgba');
        
            case 'hex':
                return this.parseHSLA(newValue, 'hex');
        
            default:
                return newValue;
        };
    
    };

    /**
     * @param {string?} I
     * @param {jsDoc_parseHEXFlags} O
     */
    static parseHEX(I, O) { 
        
        O ??= 'rgba';

        if (I == null) 
        return 'rgba(0,0,0,0)';

        if (O === 'rgba') {
            const cc = this.patternChecker(I, 'hex');

            if (cc == null)
            throw this.errorMsg(I, 'hex');

            let arr = [];
            
            switch (cc.length) {
                case 3: 
                    for (let i = 0; i < cc.length; i++) {
                        const pNum = Math.round(parseInt(cc[i].repeat(2), 16));
                        pNum >= 255 ? arr.push(255) : pNum <= 0 ? arr.push(0) : arr.push(pNum);
                    };
                    return `rgb(${arr})`;

                case 4:
                    const ap4 = parseInt(cc[3].repeat(2), 16) / 255; 

                    const a4 = ap4 > 0 && ap4 < 1 ? ap4.toFixed(1) : ap4;

                    for (let i = 0; i < cc.length - 1; i++) {
                        const pNum = Math.round(parseInt(cc[i].repeat(2), 16));
                        pNum >= 255 ? arr.push(255) : pNum <= 0 ? arr.push(0) : arr.push(pNum);
                    };
                    
                    return `rgba(${arr},${a4})`;

                case 6: 
                    for (let i = 0; i < cc.length; i++) {
                        const pNum = Math.round(parseInt(cc.slice(i++).slice(0, 2), 16));
                        pNum >= 255 ? arr.push(255) : pNum <= 0 ? arr.push(0) : arr.push(pNum);
                    };
                    return `rgb(${arr})`;

                case 8:
                    const ap8 = parseInt(`${cc[6]}${cc[7]}`, 16) / 255;

                    const a8 = ap8 > 0 && ap8 < 1 ? ap8.toFixed(1) : ap8;

                    for (let i = 0; i < cc.length - 2; i++) {
                        const pNum = Math.round(parseInt(cc.slice(i++).slice(0, 2), 16));
                        pNum >= 255 ? arr.push(255) : pNum <= 0 ? arr.push(0) : arr.push(pNum);
                    };
                
                    return `rgba(${arr},${a8})`;

                default: 
                    break;
            };
        };

        if (O === 'hsla') {
            const cc = this.parseHEX(I, 'rgba');
            return this.parseRGBA(cc, 'hsla');
        };

        return this.errorMsg(null, 'flag');

    };

    /**
     * @param {string?} I
     * @param {jsDoc_parseRGBAFlags} O
     */
    static parseRGBA(I, O) {

        O ??= 'hex';

        if (I == null) 
        return '#00000000';

        const cc = this.patternChecker(I, 'rgba');

        if (cc == null)
        throw this.errorMsg(I, 'rgba');

        if (O === 'hex') {

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

        if (O === 'hsla') {

            const arr = cc.split(',');
            const a = arr[3];

            if (a < 0 || a > 1)
            throw this.errorMsg(I, 'rgba');

            const c = arr.length === 3 ? arr.map(v =>  v / 255) : arr.splice(0,3).map(v =>  v / 255);
            const cmax = Math.max(...c);
            const cmin = Math.min(...c);
            const d = cmax - cmin;

            const h = d === 0 ? 0 :
            cmax == c[0] ? 60 * (((c[1] - c[2]) / d) % 6 ) :
            cmax == c[1] ? 60 * (((c[2] - c[0]) / d) + 2 ) :
            60 * (((c[0] - c[1]) / d) + 4 );

            const H = h < 0 ? 360 + h : h;

            const L = (cmax + cmin) / 2;

            const S = d === 0 ? 0 : d / (1 - Math.abs(2 * L - 1));

            if (arr.length === 3)
            return `hsl(${Math.round(H)},${Math.round(S * 100)}%,${Math.round(L * 100)}%)`;
                
            return `hsla(${Math.round(H)},${Math.round(S * 100)}%,${Math.round(L * 100)}%,${a})`;

        };

        return this.errorMsg(null, 'flag');

    };

    /**
     * @param {string?} I
     * @param {jsDoc_parseHSLAFlags} O
     */
    static parseHSLA(I, O) {

        O ??= 'rgba';

        if (I == null) 
        return 'rgba(0,0,0,0)';

        if (O === 'rgba') {

            const cc = this.patternChecker(I, 'hsla');

            if (cc == null)
            throw this.errorMsg(I, 'hsla');

            const arr = cc.replace(/\%/g, '').split(',');
            const alpha = arr[3];

            if (alpha < 0 || alpha > 1)
            throw this.errorMsg(I, 'hsla');

            const c = arr.length === 3 ? arr : arr.splice(0,3);

            const H = c[0];
            const S = c[1] / 100;
            const L = c[2] / 100;

            const Z = (1 - Math.abs(2 * L -1)) * S;
            const X = Z * (1 - Math.abs((H / 60) % 2 - 1) );
            const m = L - Z / 2;

            const _rgb = H >= 0 && H < 60 ? [Z, X, 0]
            : H >= 60 && H < 120 ? [X, Z, 0]
            : H >= 120 && H < 180 ? [0, Z, X]
            : H >= 180 && H < 240 ? [0, X, Z]
            : H >= 240 && H < 300 ? [X, 0, Z]
            : [Z, 0, X];

            const rgb = _rgb.map(x => Math.round((x + m) * 255));
            
            if (arr.length === 3)
            return `rgb(${rgb})`;

            return `rgba(${rgb},${alpha})`;

        };

        if (O === 'hex') {

            const cc = this.parseHSLA(I, 'rgba');
            return this.parseRGBA(cc, 'hex');

        };

        return this.errorMsg(null, 'flag');

    };

    /**
     * @param {string} [I] 
     * @param {jsDoc_parseCSSColorFlags} [O] 
     */
    static parseCSS(I, O) {

        if (I == null)
        return 'transparent';

        O ??= 'hex';

        if (!O.match(/^(hex|rgb|hsl)$/))
        return this.errorMsg(null, 'flag');

        const cc = this.patternChecker(I, 'css');

        if (cc == null)
        throw this.errorMsg(I, 'css');

        for (let i = 0; i < CSSColors.length; i++) {

            if (O == 'rgb' && cc == CSSColors[i][0])
            return this.parseHEX(CSSColors[i][1], 'rgba');

            if (O == 'hsl' && cc == CSSColors[i][0])
            return this.parseHEX(CSSColors[i][1], 'hsla');

            if (O == 'hex' && cc == CSSColors[i][0])
            return CSSColors[i][1];

        };

        throw this.errorMsg(I, 'css');

    };

    /**
     * @param {string} pattern 
     * @param {jsDoc_flags} type 
     */
    static patternChecker(pattern, type) {

        if (typeof pattern !== 'string')
        throw new Error('');
        
        const cws = pattern.replace(/\s/g, '');

        switch (type) {
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
                return this.errorMsg();
        }

    };

    /**
     * @param {string} color 
     * @param {jsDoc_flags} patternType 
     */
    static errorMsg(color, patternType) {

        const defaultError = new Error('');

        if (arguments.length < 2)
        throw defaultError;
        
        const tipMsg = patternType == 'hex' ? ''
        : patternType == 'rgba' ? ''
        : patternType == 'hsla' ? ''
        : patternType == 'css' ? ''
        : null;

        if (color == null && patternType === 'flag')
        throw new Error('');

        if (tipMsg == null)
        throw defaultError;

        return new Error('');

    };

};