
class Game {

    static gameProperties = {
        contentArea: document.getElementById('content'),
        deck: 0,
        deckSize: 10,
        arr: [],
        score: 0,
        matches: 0
    };

    static mainGame() {

        for (let i = 0; i <= 1; i++) {
            const cardBox = document.createElement('div');
            cardBox.id = `cardbox${i}`;
            cardBox.classList = 'cardbox';
            gameProperties.contentArea.appendChild(cardBox);
        };
    
        const cardBoxA = document.getElementById('cardbox0');
        const cardBoxB = document.getElementById('cardbox1');
    
        const cardsArr = [];
    
        for (let i = 0; i < gameProperties.deckSize; i++) {
            if (i >= gameProperties.deckSize / 2) {
                cardsArr.push(`<div id="card${i}" class="card">
                <img src="/post/p1_memory_cardz/img/${i - gameProperties.deckSize / 2}.png" class="front-face">
                </div>`);
            } else {
                cardsArr.push(`<div id="card${i}" class="card">
                <img src="/post/p1_memory_cardz/img/${i}.png" class="front-face">
                </div>`);
            };  
        };
    
        cardsArr.sort(() => Math.random() - 0.5);
    
        cardBoxA.innerHTML = `${cardsArr.slice(0, cardsArr.length / 2)}`.replace(/,/g, '');
        cardBoxB.innerHTML = `${cardsArr.slice(cardsArr.length / 2 , cardsArr.length)}`.replace(/,/g, '');
    
        const timeout = 2000;
    
        this.reveal(timeout); 
    
        setTimeout(() => {
            for (let i = 0; i <= 9; i++) { card(i); };
        }, timeout);
        
    };

    static reveal(timer) {
        const open = 'rotateY(0deg)';
        const close = 'rotateY(180deg)';
    
        for (let i = 0; i <= 9; i++) {
            const elem = document.getElementById(`card${i}`).style;
            
            elem.transition = '700ms';
            elem.transform = open;
    
            setTimeout(() => {
                elem.transform = close;      
            }, timer);
        };
    };

    static flipper(quickElem) {

        const ms = 'ms'
        const time = 700;
        const open = `rotateY(0deg) rotateZ(${
            Math.floor(Math.random() * 7) * (Math.round(Math.random()) ? 1 : -1)
        }deg) scaleY(1.2) scaleX(1.2)`;
        const close = 'rotateY(180deg)';
        const shadow = '15px 15px 20px #000000';
    
        const qElem = quickElem.style;
        qElem.transition = time + ms;
        qElem.transform = open;
        qElem.boxShadow = shadow;
        qElem.zIndex = 1;
    
        const eA = document.getElementById(`card${gameProperties.arr[0]}`);
        const eB = document.getElementById(`card${gameProperties.arr[1]}`);
    
        if (gameProperties.arr.length == 2 &&
            Math.abs(gameProperties.arr[0] - gameProperties.arr[1]) == (gameProperties.deck / 2)) {
    
            gameProperties.score += 100;
            console.log(gameProperties.score);
    
            gameProperties.matches++;
            endGame(gameProperties.matches, gameProperties.deck / 2);
    
            console.log('%cPair!', 'color: lime; font-size: 16px; font-weight: 700;');
    
            const pair = x => {
                x.style.transition = time + ms;
                x.style.transform = 'rotateZ(0deg) scaleY(1) scaleX(1)';
                x.style.boxShadow = 'none';
                x.style.zIndex = 0;
    
                setTimeout(() => {
                    x.parentNode.replaceChild(x.cloneNode(true), x);
                }, time);
            };
    
            pair(eA);
            pair(eB);
            gameProperties.arr = [];
    
        };
    
        if (gameProperties.arr.length >= 2) {
    
            gameProperties.score -= 50;
            console.log(gameProperties.score);
    
            eB.style.transition = time + ms;
            eB.style.transform = open;
            eB.style.boxShadow = shadow;
            eB.style.zIndex = 1;
    
            gameProperties.arr = [];
    
            const unpair = x => {
                x.style.transition = time + ms;
                x.style.transform = close;
                x.style.boxShadow = 'none';
                x.style.zIndex = 0;
            };
    
            setTimeout(() => {
    
                unpair(eA);
                unpair(eB);
                console.log('%cUnpair!', 'color: coral; font-size: 16px; font-weight: 700;');
    
            }, time - 100);
    
        };
    
        console.log('%cWaiting...', 'color: yellow; font-size: 16px; font-weight: 700;');
    };

    static card(value) {

        gameProperties.deck++;
        
        const element = document.getElementById(`card${value}`);
    
        element.addEventListener('click', function matcher() {
    
            gameProperties.arr.push(value);
            flipper(element);
    
        });
    
    };

    static endGame(k, v) {
        if (k === v) {
    
            console.log('%cGame Over!', 'color: aqua; font-size: 16px; font-weight: 700;');
    
            const rank = v * 100;
    
            if (gameProperties.score === rank) {
                console.log('%cS', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (gameProperties.score >= rank * 0.8) {
                console.log('%cA', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (gameProperties.score >= rank * 0.7) {
                console.log('%cB', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (gameProperties.score >= rank * 0.6) {
                console.log('%cC', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (gameProperties.score >= rank * 0.5) {
                console.log('%cD', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (gameProperties.score >= rank * 0.4) {
                console.log('%cE', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            if (gameProperties.score < rank * 0.4) {
                console.log('%cF', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
        };
    };

};


const gameProperties = {
    contentArea: document.getElementById('content'),
    deck: 0,
    deckSize: 10,
    arr: [],
    score: 0,
    matches: 0
};

export function mainGame() {

    for (let i = 0; i <= 1; i++) {
        const cardBox = document.createElement('div');
        cardBox.id = `cardbox${i}`;
        cardBox.classList = 'cardbox';
        gameProperties.contentArea.appendChild(cardBox);
    };

    const cardBoxA = document.getElementById('cardbox0');
    const cardBoxB = document.getElementById('cardbox1');

    const cardsArr = [];

    for (let i = 0; i < gameProperties.deckSize; i++) {
        if (i >= gameProperties.deckSize / 2) {
            cardsArr.push(`<div id="card${i}" class="card">
            <img src="/post/p1_memory_cardz/img/${i - gameProperties.deckSize / 2}.png" class="front-face">
            </div>`);
        } else {
            cardsArr.push(`<div id="card${i}" class="card">
            <img src="/post/p1_memory_cardz/img/${i}.png" class="front-face">
            </div>`);
        };  
    };

    cardsArr.sort(() => Math.random() - 0.5);

    cardBoxA.innerHTML = `${cardsArr.slice(0, cardsArr.length / 2)}`.replace(/,/g, '');
    cardBoxB.innerHTML = `${cardsArr.slice(cardsArr.length / 2 , cardsArr.length)}`.replace(/,/g, '');

    const timeout = 2000;

    reveal(timeout); 

    setTimeout(() => {
        for (let i = 0; i <= 9; i++) { card(i); };
    }, timeout);
    
};

function reveal(timer) {
    const open = 'rotateY(0deg)';
    const close = 'rotateY(180deg)';

    for (let i = 0; i <= 9; i++) {
        const elem = document.getElementById(`card${i}`).style;
        
        elem.transition = '700ms';
        elem.transform = open;

        setTimeout(() => {
            elem.transform = close;      
        }, timer);
    };
};

function flipper(quickElem) {

    const ms = 'ms'
    const time = 700;
    const open = `rotateY(0deg) rotateZ(${
        Math.floor(Math.random() * 7) * (Math.round(Math.random()) ? 1 : -1)
    }deg) scaleY(1.2) scaleX(1.2)`;
    const close = 'rotateY(180deg)';
    const shadow = '15px 15px 20px #000000';

    const qElem = quickElem.style;
    qElem.transition = time + ms;
    qElem.transform = open;
    qElem.boxShadow = shadow;
    qElem.zIndex = 1;

    const eA = document.getElementById(`card${gameProperties.arr[0]}`);
    const eB = document.getElementById(`card${gameProperties.arr[1]}`);

    if (gameProperties.arr.length == 2 &&
        Math.abs(gameProperties.arr[0] - gameProperties.arr[1]) == (gameProperties.deck / 2)) {

        gameProperties.score += 100;
        console.log(gameProperties.score);

        gameProperties.matches++;
        endGame(gameProperties.matches, gameProperties.deck / 2);

        console.log('%cPair!', 'color: lime; font-size: 16px; font-weight: 700;');

        const pair = x => {
            x.style.transition = time + ms;
            x.style.transform = 'rotateZ(0deg) scaleY(1) scaleX(1)';
            x.style.boxShadow = 'none';
            x.style.zIndex = 0;

            setTimeout(() => {
                x.parentNode.replaceChild(x.cloneNode(true), x);
            }, time);
        };

        pair(eA);
        pair(eB);
        gameProperties.arr = [];

    };

    if (gameProperties.arr.length >= 2) {

        gameProperties.score -= 50;
        console.log(gameProperties.score);

        eB.style.transition = time + ms;
        eB.style.transform = open;
        eB.style.boxShadow = shadow;
        eB.style.zIndex = 1;

        gameProperties.arr = [];

        const unpair = x => {
            x.style.transition = time + ms;
            x.style.transform = close;
            x.style.boxShadow = 'none';
            x.style.zIndex = 0;
        };

        setTimeout(() => {

            unpair(eA);
            unpair(eB);
            console.log('%cUnpair!', 'color: coral; font-size: 16px; font-weight: 700;');

        }, time - 100);

    };

    console.log('%cWaiting...', 'color: yellow; font-size: 16px; font-weight: 700;');
};


function card(value) {

    gameProperties.deck++;
    
    const element = document.getElementById(`card${value}`);

    element.addEventListener('click', function matcher() {

        gameProperties.arr.push(value);
        flipper(element);

    });

};

function gameover() {

    

};

function endGame(k, v) {
    if (k === v) {

        

        console.log('%cGame Over!', 'color: aqua; font-size: 16px; font-weight: 700;');

        const rank = v * 100;

        if (gameProperties.score === rank) {
            console.log('%cS', 'color: aqua; font-size: 24px; font-weight: 700;');
        }

        else if (gameProperties.score >= rank * 0.8) {
            console.log('%cA', 'color: aqua; font-size: 24px; font-weight: 700;');
        }

        else if (gameProperties.score >= rank * 0.7) {
            console.log('%cB', 'color: aqua; font-size: 24px; font-weight: 700;');
        }

        else if (gameProperties.score >= rank * 0.6) {
            console.log('%cC', 'color: aqua; font-size: 24px; font-weight: 700;');
        }

        else if (gameProperties.score >= rank * 0.5) {
            console.log('%cD', 'color: aqua; font-size: 24px; font-weight: 700;');
        }

        else if (gameProperties.score >= rank * 0.4) {
            console.log('%cE', 'color: aqua; font-size: 24px; font-weight: 700;');
        }

        if (gameProperties.score < rank * 0.4) {
            console.log('%cF', 'color: aqua; font-size: 24px; font-weight: 700;');
        }

    };
};