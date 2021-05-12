`use strict`
/**
 * @file A collection of utilities in ECMAScript
 * @copyright Josélio de S. C. Júnior 2021
 * @license AGPL-3.0-or-later
 */

/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @requires <input type="text" ... >
 * @description Makes a type text HTMLInputElement to work similar as a type number HTMLInputElement and allows to set the maximum range of digits of an integer or of a decimal number.
 * @param {HTMLInputElement} input The input element where this function will be working on.
 * @param {Number} intMaxLength Number that specifies the maximum number of digits of the integer range.
 * @param {String?} numberType String that specifies if it is a decimal, a signed decimal or a signed number.
 * 
 * When setted as 'digit' - allows just numbers;
 * 
 * When setted as 'signed' - allows negative number;
 * 
 * When setted as 'decimal' - allows decimal number;
 * 
 * When setted as 'decimal|signed' or vice-versa - allows negative decimal number.
 * @param {Number?} decimalMaxLength Number that specifies the maximum number of digits of the decimal range.
 * When it is null, but decimal is true, the maximum number of digits of decimal range will be set by default as 2.
 */
export function numberInput(input, intMaxLength, numberType, decimalMaxLength) {

    input.addEventListener('keydown', (e)=> {        

    setTimeout(() => {
        // Turns the value into 0 if the 0 digit is typed more than once without a dot sign or does nothing if number type is 'digit'.
        if (numberType != 'digit' && input.value.match(/(?<![0-9]|\.)00/))
        return input.value = '0';

        // Turns the value into minus sign if after it a dot sign is typed.
        if (input.value.match(/\-\./))
        return input.value = '-';
    }, 0);

        const v = input.value;

        const d = numberType != null && numberType.match(/decimal/) ? '' : '.';
        const m = numberType != null && numberType.match(/signed/) ? '' : '-';
        
        // Locks or unlocks dot and minus sign keys depending of the result of the last two constants above.
        if (e.key == d || e.key == m) 
        return e.preventDefault();

        // Blocks the dot key to be typed just once.
        if (v.match(/\./) && e.key == '.')
        return e.preventDefault();
    
        // Blocks the minus key to be typed just once and just before a number.
        if (v.match(/\-|\d+/) && e.key == '-')
        return e.preventDefault();

        const iP = new RegExp(`(?<![0-9]|\\.)\\d{${intMaxLength}}(?!\\.|[0-9])`);

        // Blocks the maximum range of digits of an integer number.
        if (v.match(iP) && e.key.match(/[0-9]/))
        return e.preventDefault();

        const dL = decimalMaxLength == null ? 2 : decimalMaxLength;
        const dP = new RegExp(`\\d{1,${intMaxLength}}\\.\\d{${dL}}`);

        // Blocks the maximum range of digits of a decimal number.
        if (v.match(dP) && e.key.match(/[0-9]/))
        return e.preventDefault();
     
        // Allows that keys to be listened as default.
        if (e.key.match(/Backspace|Delete|ArrowLeft|ArrowRight|Home|End/))
        return true;

        // Unlistens all keys, except the ones allowed before, digits keys, dot sign key and minus sign key.
        if (!e.key.match(/[0-9]|\.|\-/)) 
        return e.preventDefault();
    }); 
};