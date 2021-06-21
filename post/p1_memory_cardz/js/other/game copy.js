export function mainGame() {
    for (let i = 0; i <= 9; i++) {
        card(i);
    };
};



function pairChecker(k, v) {

    if (Math.abs(k - v) == 5) {
        console.log('Pair')
        arr = [];
    }
    
    else if (v.length > 2) {
        console.log('Unmatch')
        arr = [];
    }
};




let arr = [];

function card(value) {
    
    let status = true;
    const element = document.getElementById(`card${value}`);

    

    element.addEventListener('click', ()=> {

        if (status) {
            
            arr.push(value);

            if (arr.length == 2 && Math.abs(arr[0] - arr[1]) == 5) {
                console.log('%cPair!', 'color: lime; font-size:12px;');
                arr = [];
                status = true;

            } else {
                console.log(arr)
                status = false;

            }

            
        } 
        
        else {
            
            
            status = true;


        };

    });

};