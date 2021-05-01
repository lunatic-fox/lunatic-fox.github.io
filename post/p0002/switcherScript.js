const sOn = document.getElementById('s-on');
const sOff = document.getElementById('s-off');
const lightOn = document.getElementById('light-on');
const lightOff = document.getElementById('light-off');

sOn.addEventListener('click',()=>{
    lightOff.classList = 'off';
    lightOn.classList = 'on';
    sOn.classList = 'off';
    sOff.classList = 'on button';
});
sOff.addEventListener('click',()=>{
    lightOff.classList = 'on';
    lightOn.classList = 'off';
    sOn.classList = 'on button';
    sOff.classList = 'off';
});