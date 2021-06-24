import { Game } from "./game.js";
import { GameAbout } from "./gameAbout.js";

export class GameTitleScreen {

    static elem = {

        get titleScreen() { return document.getElementById('title-screen') },
        get titleBtnBox() { return document.getElementById('title-btn-box') },
        get gameVersion() { return document.getElementById('game-version') },
        get newGame() { return document.getElementById('new-game-btn') },
        get about() { return document.getElementById('about-game-btn') },
        get language() { return document.getElementById('language-game-btn') },
        get quit() { return document.getElementById('quit-game-btn') },
        get githubMsg() { return document.getElementById('github-msg') }

    };

    static get gEn() {        
        this.elem.gameVersion.innerHTML = 'alpha version';
        this.elem.newGame.innerHTML = 'new game';
        this.elem.language.innerHTML = 'language';
        this.elem.about.innerHTML = 'about';
        this.elem.quit.innerHTML = 'quit';
        this.elem.githubMsg.innerHTML = 'Star me on Github';
    };

    static get gPt() {
        this.elem.gameVersion.innerHTML = 'versão alfa';
        this.elem.newGame.innerHTML = 'novo jogo';
        this.elem.language.innerHTML = 'idioma';
        this.elem.about.innerHTML = 'sobre';
        this.elem.quit.innerHTML = 'sair';
        this.elem.githubMsg.innerHTML = 'Favorite-me no Github';
    };

    static create() {

        const titleScreen = `
        <section id="title-screen" class="flex" style="opacity: 0%;">
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
                    <div id="language-game-btn" class="t-btn flex">
                        language
                    </div>
                    <div id="about-game-btn" class="t-btn flex">
                        about
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
        this.elem.titleScreen.style.transition = '400ms';
        this.elem.titleScreen.style.opacity = '100%';

        if (navigator.language == 'pt') {
            this.gPt;
        } else {
            this.gEn;
        };

        this.initButtons();

    };

    static initButtons() {

        // New game
        this.elem.newGame.addEventListener('click', ()=> {
            //Transition.fadeOut(this.elem.titleScreen);

            const timer = 400;
            this.elem.titleScreen.style.transition = `${timer}ms`;
            this.elem.titleScreen.style.opacity = '0%';

            setTimeout(() => {
                this.elem.titleScreen.style.display = 'none';
                Game.newGame();
            }, timer);
      
            
        });

        // Language
        let langStatus = navigator.language == 'pt' ? false : true;
        this.elem.language.addEventListener('click', () => {

            if (langStatus) {
                this.gPt;
                langStatus = false;
            } else {
                this.gEn;
                langStatus = true;              
            }; 
        });

        // About
        this.elem.about.addEventListener('click', ()=> {
            GameAbout.createAboutScreen();
        });

        // Quit
        this.elem.quit.addEventListener('click', ()=> {
            document.exitFullscreen();
            Game.properties.contentArea.style.display = 'none';
        });

    };



};