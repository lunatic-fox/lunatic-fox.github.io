// To get a element by id with less code.   
function id(id){return document.getElementById(id);};

// To replace some tags with a chunk of HTML code...
/* 
    That function search for all div elements with "tag" name and
    then replace what's inside that element with a chunk of code
    that shows the programming language used inside the project
    and a lil' icon colored with color pattern of programming
    languages used in GitHub.
*/
function playTag(){
    const tagLocation = document.querySelectorAll('div [name = "tag"]');

    const tagName = ['Kotlin','JavaScript','JSON','CSS','HTML','Java'];

    for(i=0;i<tagLocation.length;i++){        
        for(j=0;j<tagName.length;j++){
            tagLocation[i].innerHTML = tagLocation[i].innerHTML.split(`#${tagName[j]}`).join(
                `<div class="fx tag-box">
                    <div class="language-description">
                        ${tagName[j]}
                    </div>
                    <div class="lang-icon ${tagName[j]}"></div>
                </div>`
            );    
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

// That part makes that function to work. Error fixed!
playTag();

// let ops = document.querySelector('div [name = "tag"]');
// console.log(ops.innerHTML)