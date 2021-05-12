import {numberInput} from './javascript/utils.js';

const digit = document.getElementById('digit');
const integer = document.getElementById('integer');
const decimal = document.getElementById('decimal');
const signed = document.getElementById('signed');


const intRangeOp = document.getElementById('int-range-options');
const decRangeOp = document.getElementById('dec-range-options');
const digRangeOp = document.getElementById('dig-range-options');


const intRange = document.getElementById('int-range');
const decRange = document.getElementById('dec-range');
const digRange = document.getElementById('dig-range');

const ok = document.getElementById('ok');

const result = document.getElementById('result');


let nt = 0;
let signedOp = 0;

const on = '#19b6ffe8';
const off = '#19b6ff65';

const enable = 'project-subtitle';
const gone = 'gone';

digit.addEventListener('click', ()=> {
    digit.style.background = on;
    integer.style.background = off;
    decimal.style.background = off;
    signed.style.background = off;

    digRangeOp.classList = enable;
    intRangeOp.classList = gone;
    decRangeOp.classList = gone;

    nt = 1;
    ok.removeAttribute('class');


    signedOp = 1;
});

integer.addEventListener('click', ()=> {
    digit.style.background = off;
    integer.style.background = on;
    decimal.style.background = off;
    signed.style.background = off;

    digRangeOp.classList = gone;
    intRangeOp.classList = enable;
    decRangeOp.classList = gone;

    nt = 2;
    ok.removeAttribute('class');

    if (signedOp == 1)
    signed.style.background = on;
});

decimal.addEventListener('click', ()=> {
    digit.style.background = off;
    integer.style.background = off;
    decimal.style.background = on;
    signed.style.background = off;

    digRangeOp.classList = gone;
    intRangeOp.classList = enable;
    decRangeOp.classList = enable;

    nt = 3;
    ok.removeAttribute('class');

    if (signedOp == 1)
    signed.style.background = on;
});

signed.addEventListener('click', ()=> {
    signedOp = 1;
    if (signedOp == 1)
    signed.style.background = on;
});

numberInput(intRange, 2);
numberInput(decRange, 2);
numberInput(digRange, 2);

ok.addEventListener('click', ()=> {
    result.removeEventListener('keydown', numberInput);
    result.value = '';
    tester();
});

function tester() {
    let range = nt == 1 ? digRange.value / 1 : intRange.value / 1;

    let ntype = 
    nt == 1 ? 'digit' 
    : nt == 3 && signedOp == 1 ? 'decimal|signed'
    : nt == 3 ? 'decimal' 
    : signedOp == 1 ? 'signed' : null;

    let drange = decRange.value > 0 ? decRange.value : null;

    numberInput(result, range, ntype, drange);
    result.removeAttribute('class');
};