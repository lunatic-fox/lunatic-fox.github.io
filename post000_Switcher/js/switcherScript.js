function id(id){return document.getElementById(id);};

id('s-on').addEventListener('click',()=>{
    id('light-off').classList = 'off';
    id('light-on').classList = 'on';
    id('s-on').classList = 'off';
    id('s-off').classList = 'on button';
});
id('s-off').addEventListener('click',()=>{
    id('light-off').classList = 'on';
    id('light-on').classList = 'off';
    id('s-on').classList = 'on button';
    id('s-off').classList = 'off';
});