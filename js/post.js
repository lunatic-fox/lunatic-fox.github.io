function playText(){ 
    const textArea = document.querySelectorAll('.text-area');
    // Line breaker
    for(i=0; i < textArea.length; i++){
        textArea[i].innerHTML=
        textArea[i].innerHTML.split(`\n`).join(`<br>`);
    };

    // Indentation
    for(i=0; i  < textArea.length; i++){
        textArea[i].innerHTML=
        textArea[i].innerHTML.split(/\s{4}/).join(`&nbsp&nbsp&nbsp&nbsp`);
    };
};