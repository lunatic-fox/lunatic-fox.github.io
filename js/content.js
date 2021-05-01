const content = document.getElementById('content');
const transition = document.getElementById('transition-block');

function requestPost(id) {
    document.getElementById(id).addEventListener('click', ()=> {
        requestJSON(id);
    });
};

function contentConstructor(author, date, title) {
    content.innerHTML = `
        <div id="content-header">
            <div id="content-bd-box" class="fx">
                <div id="content-back">
                    <img src="img/001.png" height="100%">
                </div>
                <div id="content-description">
                    Criado por: <span id="content-author">${author}</span><br>
                    Última modificação em: <span id="content-date">${date}</span>
                </div>
            </div>
            <div id="content-title-card" class="fx">
                <div id="content-title">${title}</div>
            </div>
        </div>
        <div id="content-body" class="fx blk">*</div>`;
};

function errorConstructor(image, title, message) {
    content.innerHTML = `
    <div id="content-header">
        <div id="content-bd-box" class="fx">
            <div id="content-back">
                <img src="img/001.png" height="100%">
            </div>
            <div class="not-found-title">${title}</div>
        </div>
    </div>
    <div id="no-content" class="fx">
        <img src="${image}">
        <div class="fx blk not-found-box">
            <div class="not-found-msg">${message}</div>
        </div>
    </div>`;
};

function contentBackButton(removeScript) {
    const articles = document.getElementsByTagName('article');
    function goBack() {
        for(i = 0; i < articles.length; i++) {
            articles[i].removeAttribute('class');
        };
        content.classList = 'gone';
        content.innerHTML = '';
    };

    const contentBack = document.getElementById('content-back');
    

    if (removeScript != null) {
        contentBack.addEventListener('click', ()=> {
            document.body.removeChild(document.getElementById('temp-script'));
            goBack();
        });
    } else {
        contentBack.addEventListener('click', ()=> {
            goBack();
        });
    };
};

function noContent(reason) {
    const articles = document.getElementsByTagName('article');

    for(i = 0; i < articles.length; i++) {
        articles[i].classList = 'gone';
    };

    transition.classList = 'gone';
    content.classList = 'transition';
    
    switch (reason) {
        case 404:
            errorConstructor(
                'img/003.png',
                '404',
                `<p> Infelizmente a página não foi encontrada. </p>
                <p> É bem possível que o motivo disso estar ocorrendo seja por alguma manutenção da página. Mas anime-se, logo, logo tudo estará no seu devido lugar. </p>`
            );
            break;

        case 'offline':
            errorConstructor(
                'img/012.png',
                'Sem conexão',
                `<p> Parece que estamos offline. </p>`
            );            
            break;
    };
    contentBackButton();
};

function loadFeatures(scriptPath, titleCardHexColor) {
    const articles = document.getElementsByTagName('article');
    const titleCardColor = document.getElementById('content-title-card');

    function goToPost() {
        for(i = 0; i < articles.length; i++) {
            articles[i].classList = 'gone';
        };
        content.classList = 'fx blk';
    };

    if (scriptPath != '') {
        goToPost();

        setTimeout(() => {
            const node = document.createElement('script');
            node.id = 'temp-script';
            node.src = scriptPath;
            document.body.appendChild(node);
        }, 200);
        contentBackButton(true);

    } else {
        goToPost();
        contentBackButton();
    };

    if (titleCardHexColor != '') {
        titleCardColor.style = `background: linear-gradient(transparent, ${titleCardHexColor});`;
    };
};

function contentProvider(path) {
    const contentBody = document.getElementById('content-body');

    const requestContent = new XMLHttpRequest();
    requestContent.open('GET', path);
    requestContent.send();

    requestContent.onreadystatechange = function() {

        if (this.readyState === 4) {
            switch (this.status) {
                case 200:
                    transition.classList = 'transition-block';
                    contentBody.innerHTML = this.responseText;

                    transition.classList = 'gone';
                    content.classList = 'transition';
                    playText();
                    break;

                case 404:
                    transition.classList = 'transition-block';
                    noContent(404);
                    break;
            }
        };      
    };
};

function requestJSON(from) {
    const requestHeader = new XMLHttpRequest();
    requestHeader.open('GET', `json/${from}.json`);
    requestHeader.send();
    requestHeader.onerror = noContent('offline');
    requestHeader.onreadystatechange = function() {
        if (this.readyState === 4) {
            switch (this.status) {
                case 200:
                    transition.classList = 'transition-block';   
                    let obj = JSON.parse(this.response);
                    contentConstructor(obj.author, obj.date, obj.title);
                    contentProvider(obj.path.content);
                    loadFeatures(obj.path.script, obj.titleCardColor);
                    break;

                case 404:
                    transition.classList = 'transition-block';
                    noContent(404);
                    break;
            }
        };
    };      
};

requestPost('p0002');