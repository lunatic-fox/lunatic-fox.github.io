// To get a element by id with less code.   
function id(id){return document.getElementById(id);};

// Still working in this function!
function playText(){ 
    const textArea = document.querySelectorAll('.text-area');

    // Size
    for(i=0;i<textArea.length;i++){
        textArea[i].innerHTML=
        textArea[i].innerHTML

        .replace(   //  [s.00]  [!color.i.b]    [ text text text]   --> Text size and formatting variation 2.
            /\[s\.(\d+)\]( *\[\!(.*?)\]| *\[\!(.*?)\.i\]| *\[\!(.*?)\.b\]| *\[\!(.*?)\.i\.b\]| *\[\!(.*?)\.b\.i\]| *\[\!b\.i\]| *\[\!i\.b\]| *\[\!b\]| *\[\!i\]) *\[(.*?)\](\s|\n)/g,
            `<span style="font-size:$1px;">$2[$8]$9</span>`) 

        .replace(   //  [s.00][!color.i.b][ text text text]  --> Text size and formatting variation 1.
            /\[s\.(\d+)\](\[\!(.*?)\]|\[\!(.*?)\.i\]|\[\!(.*?)\.b\]|\[\!(.*?)\.i\.b\]|\[\!(.*?)\.b\.i\]|\[\!b\.i\]|\[\!i\.b\]|\[\!b\]|\[\!i\])\[(.*?)\](\s|\n)/g,
            `<span style="font-size:$1px;">$2[$8]$9</span>`) 

        .replace(   //  [s.00][!color.i.b] --> Word size and formatting.
            /\[s\.(\d+)\](\[\!(.*?)\]|\[\!(.*?)\.i\]|\[\!(.*?)\.b\]|\[\!(.*?)\.i\.b\]|\[\!(.*?)\.b\.i\]|\[\!b\.i\]|\[\!i\.b\]|\[\!b\]|\[\!i\])( *.*?|.*?)(\s|\n)/g,
            `<span style="font-size:$1px;">$2$8$9</span>`)  

        .replace(   //  [s.00][ text text text] --> Text size.
            /\[s\.(\d+)\]\[(.*?)\](\s|\n)/g,
            `<span style="font-size:$1px;">$2$3</span>`)

        .replace(   //  [s.00]  --> Word size.
            /\[s\.(\d+)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="font-size:$1px;">$2$3</span>`)
        ;
        };

    // Color, italic, bold word and text.
    for(i=0;i<textArea.length;i++){
        textArea[i].innerHTML=
        textArea[i].innerHTML
        .replace(   //  [!i][ text text text] --> Italic text.
            /\[\!(i)\]\[(.*?)\](\s|\n|\,|\.)/g,
            `<span style="font-style:$1talic;">$2$3</span>`)

        .replace(   //  [!b][ text text text] --> Bold text.
            /\[\!(b)\]\[(.*?)\](\s|\n)/g,
            `<span style="font-weight:$1old;">$2$3</span>`)

        .replace(   //  [!i.b][ text text text]  --> Italic and bold text.
            /\[\!(i)\.(b)\]\[( *.*?|.*?)\](\s|\n)/g,
            `<span style="font-style:$1talic;font-weight:$2old">$3$4</span>`)

        .replace(   //  [!b.i][ text text text]  --> Bold and italic text.
            /\[\!(b)\.(i)\]\[( *.*?|.*?)\](\s|\n)/g,
            `<span style="font-style:$2talic;font-weight:$1old">$3$4</span>`)

        .replace(   //  [!color.i.b][ text text text] --> Color, italic and bold text.
            /\[\!(.*?)\.(i)\.(b)\]\[(.*?)\](\s|\n)/g,
            `<span style="color:$1;font-weight:$3old;font-style:$2talic;">$4$5</span>`)

        .replace(   //  [!color.b.i][ text text text] --> Color, bold and italic text.
            /\[\!(.*?)\.(b)\.(i)\]\[(.*?)\](\s|\n)/g,
            `<span style="color:$1;font-weight:$2old;font-style:$3talic;">$4$5</span>`)
        
        .replace(   //  [!color.b][ text text text]  --> Color and bold text.
            /\[\!(.*?)\.(b)\]\[(.*?)\](\s|\n)/g,
            `<span style="color:$1;font-weight:$2old;">$3$4</span>`)

        .replace(   //  [!color.i][ text text text]  --> Color and italic text.
            /\[\!(.*?)\.(i)\]\[(.*?)\](\s|\n)/g,
            `<span style="color:$1;font-style:$2talic;">$3$4</span>`)
        
        .replace(   //  [!color][ text text text]  --> Color text.
            /\[\!(.*?)\]\[(.*?)\](\s|\n)/g,
            `<span style="color:$1;">$2$3</span>`)

        .replace(   //  [!i] --> Italic word.
            /\[\!(i)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="font-style:$1talic;">$2$3</span>`)

        .replace(   //  [!b] --> Bold word.
            /\[\!(b)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="font-weight:$1old;">$2$3</span>`)

        .replace(   //  [!i.b] --> Italic and bold word.
            /\[\!(i)\.(b)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="font-style:$1talic;font-weight:$2old">$3$4</span>`)

        .replace(   //  [!b.i] --> Bold and italic word.
            /\[\!(b)\.(i)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="font-style:$2talic;font-weight:$1old">$3$4</span>`)

        .replace(   //  [!color.i.b] --> Color, italic and bold word.
            /\[\!(.*?)\.(i)\.(b)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="color:$1;font-weight:$3old;font-style:$2talic;">$4$5</span>`)

        .replace(   //  [!color.b.i] --> Color, bold and italic word.
            /\[\!(.*?)\.(b)\.(i)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="color:$1;font-weight:$2old;font-style:$3talic;">$4$5</span>`)
        
        .replace(   //  [!color.b] --> Color and bold word.
            /\[\!(.*?)\.(b)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="color:$1;font-weight:$2old;">$3$4</span>`)

        .replace(   //  [!color.i] --> Color and italic word.
            /\[\!(.*?)\.(i)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="color:$1;font-style:$2talic;">$3$4</span>`)

        .replace(   //  [!color] --> Color word.
            /\[\!(.*?)\]( *.*?|.*?)(\s|\n)/g,
            `<span style="color:$1;">$2$3</span>`);
    };

    // Line breaker
    for(i=0;i<textArea.length;i++){
        textArea[i].innerHTML=
        textArea[i].innerHTML.split(`\n`).join(`<br>`);
    };

    // Indentation
    for(i=0;i<textArea.length;i++){
        textArea[i].innerHTML=
        textArea[i].innerHTML.split(/\s{4}/).join(`&nbsp&nbsp&nbsp&nbsp`);
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

playText();