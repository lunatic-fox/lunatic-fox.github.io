export class Game {

    static get titleScreen() { GameTitleScreen.createTitleScreen(); };
    static get main() { this.mainGame(); };

    static properties = {
        contentArea: document.getElementById('content'),
        version: 'alpha version',
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
            this.properties.contentArea.appendChild(cardBox);
        };
    
        const cardBoxA = document.getElementById('cardbox0');
        const cardBoxB = document.getElementById('cardbox1');
    
        const cardsArr = [];
    
        for (let i = 0; i < this.properties.deckSize; i++) {
            if (i >= this.properties.deckSize / 2) {
                cardsArr.push(`<div id="card${i}" class="card">
                <img src="/post/p1_memory_cardz/img/${i - this.properties.deckSize / 2}.png" class="front-face">
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
        
        setTimeout(() => {
            for (let i = 0; i <= 9; i++) { this.card(i); };
        }, 200);

        this.reveal(2000); 
        
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
    
        const eA = document.getElementById(`card${this.properties.arr[0]}`);
        const eB = document.getElementById(`card${this.properties.arr[1]}`);
    
        if (this.properties.arr.length == 2 &&
            Math.abs(this.properties.arr[0] - this.properties.arr[1]) == (this.properties.deck / 2)) {
    
            this.properties.score += 100;
            console.log(this.properties.score);
    
            this.properties.matches++;
            this.endGame(this.properties.matches, this.properties.deck / 2);
    
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
            this.properties.arr = [];
    
        };
    
        if (this.properties.arr.length >= 2) {
    
            this.properties.score -= 50;
            console.log(this.properties.score);
    
            eB.style.transition = time + ms;
            eB.style.transform = open;
            eB.style.boxShadow = shadow;
            eB.style.zIndex = 1;
    
            this.properties.arr = [];
    
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

        this.properties.deck++;
        
        const element = document.getElementById(`card${value}`);

     
        element.style.opacity = '100%';
    
        element.addEventListener('click', ()=> {
    
            this.properties.arr.push(value);
            this.flipper(element);
    
        });
    
    };

    static endGame(k, v) {
        if (k === v) {
    
            console.log('%cGame Over!', 'color: aqua; font-size: 16px; font-weight: 700;');
    
            const rank = v * 100;
    
            if (this.properties.score === rank) {
                console.log('%cS', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.properties.score >= rank * 0.8) {
                console.log('%cA', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.properties.score >= rank * 0.7) {
                console.log('%cB', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.properties.score >= rank * 0.6) {
                console.log('%cC', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.properties.score >= rank * 0.5) {
                console.log('%cD', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            else if (this.properties.score >= rank * 0.4) {
                console.log('%cE', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
            if (this.properties.score < rank * 0.4) {
                console.log('%cF', 'color: aqua; font-size: 24px; font-weight: 700;');
            }
    
        };
    };

};

class Transition {
    /** @param {HTMLElement} elem */
    static fadeOut(elem) {
        const timer = 200;
        elem.style.transition = `${timer}ms`;
        elem.style.opacity = '0%';

        setTimeout(() => {
            elem.remove();
        }, timer);
    };

};

export class GameTitleScreen extends Transition {

    static tE = {
        titleScreen: () => document.getElementById('title-screen'),
        titleBtnBox: () => document.getElementById('title-btn-box'),
        gameVersion: () => document.getElementById('game-version'),
        newGame: () => document.getElementById('new-game-btn'),
        options: () => document.getElementById('options-game-btn'),
        quit: () => document.getElementById('quit-game-btn'),
        githubMsg: () => document.getElementById('github-msg'),
    };

    static gEn() {        
        this.tE.gameVersion().innerHTML = 'alpha version';
        this.tE.newGame().innerHTML = 'new game';
        this.tE.options().innerHTML = 'language';
        this.tE.quit().innerHTML = 'quit';
        this.tE.githubMsg().innerHTML = 'Star me on Github';
    };

    static gPt() {
        this.tE.gameVersion().innerHTML = 'versão alfa';
        this.tE.newGame().innerHTML = 'novo jogo';
        this.tE.options().innerHTML = 'idioma';
        this.tE.quit().innerHTML = 'sair';
        this.tE.githubMsg().innerHTML = 'Favorite-me no Github';
    };

    static createTitleScreen() {

        const titleScreen = `
        <section id="title-screen" class="flex">
            <section id="title-card" class="flexblock">

                <section id="game-logo" class="flexblock">
                   <span>MEMORY</span> 
                   <span>CARDZ</span>
                   <span id="game-version">${Game.properties.version}</span> 
                </section>

                
                

                <section id="title-btn-box" class="flexblock">

                    <div id="new-game-btn" class="t-btn flex">
                        new game
                    </div>

                    <div id="options-game-btn" class="t-btn flex">
                        language
                    </div>

                    <div id="quit-game-btn" class="t-btn flex">
                        quit
                    </div>

                </section>


                
                

                <section id="github-msg-box">
                    <a id="github-msg">Star me on Github</a>
                </section>

            </section>
        </section>
        `;

        Game.properties.contentArea.innerHTML = titleScreen;

        if (navigator.language == 'pt') {
            this.gPt();
        } else {
            this.gEn();
        };

        ///

        this.tE.newGame().addEventListener('click', ()=> {
            this.fadeOut(this.tE.titleScreen());
            if (screen.orientation.type == 'portrait-primary' 
            || screen.orientation.type == 'portrait-secondary') {
                screen.orientation.lock('landscape-primary');
            };
            Game.properties.contentArea.requestFullscreen();
            Game.main;
        });

        let langStatus = true;
        this.tE.options().addEventListener('click', ()=> {
            if (langStatus) {
                this.gEn();
                langStatus = false;
            } else {
                this.gPt();
                langStatus = true;
            };
        });
        ///

    };



};