// To get a element by id with less code.   
function id(id){return document.getElementById(id);};


// To replace some tags with a chunk of HTML code. 
function playTag(){
    const xy = document.querySelectorAll('.tag');

    const vector = ['Kotlin','JavaScript','JSON','CSS','HTML','Java'];

    for(i=0;i<=xy.length;i++){
        for(j=0;j<=vector.length;j++){

        xy[i].innerHTML = xy[i].innerHTML.split(`#${vector[j]}`).join(`<div class="fx tag-box">
        <div class="language-description">${vector[j]}</div>
        <div class="lang-icon ${vector[j]}"></div></div>`);
        };
    };
};


// A object to wrap the functions that makes the id "info"
// works like a switcher.
const info = {
    on:()=>{
        id('info').classList='info i-on fx';
        id('on').style='display:none;';
        id('off').style='display:block;';
    },
    off:()=>{
        id('info').classList='info i-off fx';
        id('off').style='display:none;';
        id('on').style='display:block;';   
    }
};


// That part makes the page starts without displaying id "off", then
// creates two event listeners, one to id "on" and another to id "off".
id('off').style='display:none;';
id('on').addEventListener('click',()=>{info.on();});
id('off').addEventListener('click',()=>{info.off();});


// That part makes that function to work, but have a error
// that I couldn't figure out how to fix it yet.
playTag();
