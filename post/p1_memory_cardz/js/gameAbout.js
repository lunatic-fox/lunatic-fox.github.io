import { Game } from "./game.js";
import { GameTitleScreen } from "./gameTitleScreen.js";

export class GameAbout {
    static createAboutScreen() {
        const timer = 400;
        const gameCard = GameTitleScreen.elem.titleScreen;
        gameCard.style.transition = `${timer}ms`;
        gameCard.style.opacity = '0%';
        

        setTimeout(() => {
            gameCard.remove();
            Game.properties.contentArea.innerHTML = this.aboutCard;
        }, timer);

        setTimeout(() => {
            this.backToTitleScreen();
            const gameCardAbout = GameTitleScreen.elem.titleScreen;
            gameCardAbout.style.transition = '1000ms';
            gameCardAbout.style.opacity = '100%';
        }, timer + 50);
    };

    static aboutCard = `
    
    <section id="title-screen" class="flex" style="opacity: 100%;">
    <section id="title-card" class="flexblock">
        
        <div id="about-title-box" class="flex">
            
            <div style="width: 50%;">
                <div id="go-back-title-screen">voltar</div>
            </div>
            <div id="about-title-text">Sobre</div>
            <div style="width: 50%;"></div>
        </div>

        <div id="about-text">
            Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.Este jogo é um projeto pessoal que tem como um dos seus objetivos o aprendizado de linguagens front-end, assim como a diversão em montar o projeto.
        </div>

    </section>
</section>
    `;

    static backToTitleScreen() {
        const backbtn = document.getElementById('go-back-title-screen');

        backbtn.addEventListener('click', ()=> {
            const timer = 400;
            const gameCardAbout =  GameTitleScreen.elem.titleScreen;
            gameCardAbout.style.transition = `${timer}ms`;
            gameCardAbout.style.opacity = '0%';

            setTimeout(() => {
                gameCardAbout.remove();
                Game.directInit();
            }, timer);

        });


    };


};