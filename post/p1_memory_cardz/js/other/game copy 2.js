
export class Game {

    static get main() {
        this.mainGame();
    };

    static gameProperties = {
        contentArea: document.getElementById('content'),
        version: 1.0,
        deck: 0,
        deckSize: 10,
        arr: [],
        score: 0,
        matches: 0
    };

    static createTitleScreen() {

        const createElems = (element, id, classList)=> {
            const elem = document.createElement(element);
            elem.id = id;
            elem.classList = classList;
            return elem;
        };

        //const section = document.createElement('section');
        const div = document.createElement('div');

        const titleScreen = createElems('section', 'title-screen', 'flex');

        const titleCard = createElems('section', 'title-card', 'flexblock');

        const gameLogo = createElems('section', 'game-logo', 'flexblock');
        gameLogo.innerHTML = `<span>MEMORY</span> 
        <span>CARDZ <span>v. ${this.gameProperties.version}</span> 
        </span>`;

        const titleBtnBox = createElems('section', 'title-btn-box', 'flexblock');

        const btns = 't-btn flex';
        const newGameBtn = createElems('div', 'new-game-btn', btns);
        const optionsGameBtn = createElems('div', 'options-game-btn', btns);
        const quitGameBtn = createElems('div', 'quit-game-btn', btns);

        const githubMsgBox = createElems('section', 'github-msg-box');
        const githubMsg = createElems('a', 'github-msg');

        


    };

    static removeElement(elem) {};

    static mainGame() {

        for (let i = 0; i <= 1; i++) {
            const cardBox = document.createElement('div');
            cardBox.id = `cardbox${i}`;
            cardBox.classList = 'cardbox';
            this.gameProperties.contentArea.appendChild(cardBox);
        };
    
        const cardBoxA = document.getElementById('cardbox0');
        const cardBoxB = document.getElementById('cardbox1');
    
        const cardsArr = [];
    
        for (let i = 0; i < this.gameProperties.deckSize; i++) {
            if (i >= this.gameProperties.deckSize / 2) {
                cardsArr.push(`<div id="card${i}" class="card">
                <img src="/post/p1_memory_cardz/img/${i - this.gameProperties.deckSize / 2}.png" class="front-face">
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
            for (let i = 0; i <= 9; i++) { this.card(i); };
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
    
        const eA = document.getElementById(`card${this.gameProperties.arr[0]}`);
        const eB = document.getElementById(`card${this.gameProperties.arr[1]}`);
    
        if (this.gameProperties.arr.length == 2 &&
            Math.abs(this.gameProperties.arr[0] - this.gameProperties.arr[1]) == (this.gameProperties.deck / 2)) {
    
            this.gameProperties.score += 100;
            console.log(this.gameProperties.score);
    
            this.gameProperties.matches++;
            endGame(this.gameProperties.matches, this.gameProperties.deck / 2);
    
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
            this.gameProperties.arr = [];
    
        };
    
        if (this.gameProperties.arr.length >= 2) {
    
            this.gameProperties.score -= 50;
            console.log(this.gameProperties.score);
    
            eB.style.transition = time + ms;
            eB.style.transform = open;
            eB.style.boxShadow = shadow;
            eB.style.zIndex = 1;
    
            this.gameProperties.arr = [];
    
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

        this.gameProperties.deck++;
        
        const element = document.getElementById(`card${value}`);
    
        element.addEventListener('click', ()=> {
    
            this.gameProperties.arr.push(value);
            this.flipper(element);
    
        });
    
    };

    static endGame(k, v) {
        if (k === v) {
    
            console.log('%cGame Over!', 'color: aqua; font-size: 16px; font-weight: 700;');
    
            const rank = v * 100;
    
            if (this.gameProperties.score === rank) {
                console.log('%cS', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.gameProperties.score >= rank * 0.8) {
                console.log('%cA', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.gameProperties.score >= rank * 0.7) {
                console.log('%cB', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.gameProperties.score >= rank * 0.6) {
                console.log('%cC', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.gameProperties.score >= rank * 0.5) {
                console.log('%cD', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.gameProperties.score >= rank * 0.4) {
                console.log('%cE', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            if (this.gameProperties.score < rank * 0.4) {
                console.log('%cF', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
        };
    };

};