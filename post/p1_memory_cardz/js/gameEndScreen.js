import { InGame } from "./inGame.js";

export class GameEndScreen {

    static properties = {
        get currentGameElem() { return document.getElementById('current-game'); },
        get resetGameBtn() { return document.getElementById('reset-game-btn'); },
        get mainMenuBtn() { return document.getElementById('main-menu-btn'); } 
    };

    static create(rankLetter, score, timeBonusScore, totalScore) {

        const endScreen = `
            <section id="end-card" class="flex">

                <section class="flexblock half-card1">
                    <div id="rank" class="flex grey-card">
                        <img src="./img/rank${rankLetter}.png">
                    </div>
                    <span>rank</span>
                </section>

                <section class="flexblock half-card2">
                    <div id="end-score" class="flexblock grey-card">
                        <span class="score-desc">score</span>
                        <span>${score} <sub>pts</sub><br></span>
                        <span class="score-desc">time bonus</span>
                        <span>${timeBonusScore} <sub>pts</sub><br></span>
                        <span class="score-desc">total score</span>
                        <span>${totalScore} <sub>pts</sub><br></span>
                    </div>

                    <div id="reset-game-btn" class="e-btn flex">
                        reset game
                    </div>
                    <div id="main-menu-btn" class="e-btn flex">
                        main menu
                    </div>

                </section>

            </section>`;

        const endNode = document.createElement('div');
        endNode.id = 'end-screen';
        endNode.classList = 'flex';
        endNode.innerHTML = endScreen;
        this.properties.currentGameElem.appendChild(endNode);

        setTimeout(() => {
            const endCard = document.getElementById('end-screen');
            endCard.style.transition = '1s';
            endCard.style.opacity = '100%';
        }, 0);

        this.properties.resetGameBtn.addEventListener('click', ()=> {
            InGame.resetGame();
        });
        this.properties.mainMenuBtn.addEventListener('click', ()=> {
            InGame.mainMenu();
        });

    };

};

