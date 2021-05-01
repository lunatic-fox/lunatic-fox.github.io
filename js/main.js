const info = document.getElementById('info');
const on = document.getElementById('on');
const off = document.getElementById('off');

/**
 * That function search for all \<div name="tag">...\</div> and
 * then replace what's inside that element with a chunk of code
 * that shows the programming language used inside the project
 * and a lil' icon colored with color pattern of programming
 * languages used in GitHub.
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

/** Opens id "info".*/
function onInfo() {
    info.classList='info i-on fx';
    on.style='display:none;';
    off.style='display:block;';
};
/** Closes id "info".*/
function offInfo() {
    info.classList='info i-off fx';
    off.style='display:none;';
    on.style='display:block;';   
};

off.style='display:none;';
on.addEventListener('click',()=> {
    onInfo();
});
off.addEventListener('click',()=> {
    offInfo();
});

playTag();