const content = document.getElementById('content');

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

function contentBackButton(removeScript) {
    function goBack() {
        for(i = 0; i < articles.length; i++) {
            articles[i].classList = 'fx';
        };
        content.classList = 'gone';
        content.innerHTML = '';
    };

    const contentBack = document.getElementById('content-back');
    const articles = document.getElementsByTagName('article');

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

function contentNotFound() {
    const img = 'img/003.png';
    const msg = `<p> Infelizmente a página não foi encontrada. </p>
    <p> É bem possível que o motivo disso estar ocorrendo seja por alguma manutenção da página. Mas anime-se, logo, logo tudo estará no seu devido lugar. </p>`;

    const articles = document.getElementsByTagName('article');

    for(i = 0; i < articles.length; i++) {
        articles[i].classList = 'gone';
    };
    content.classList = 'fx blk';
    content.innerHTML = `
        <div id="content-header">
            <div id="content-bd-box" class="fx">
                <div id="content-back">
                    <img src="img/001.png" height="100%">
                </div>
                <div class="not-found-title">404</div>
            </div>
        </div>
        <div id="no-content" class="fx">
            <img src="${img}">
            <div class="fx blk not-found-box">
                <div class="not-found-msg">${msg}</div>
            </div>
        </div>`;
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

        const node = document.createElement('script');
        node.id = 'temp-script';
        node.src = scriptPath;
        document.body.appendChild(node);

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

        if (this.readyState == 4 && this.status == 200) {
                contentBody.innerHTML = this.responseText;
                playText();
        } else if (this.readyState == 4
            && this.status == 404){
                contentNotFound();
        } else {''};
        
    };
};

function requestJSON(from) {
    let obj;

    const requestHeader = new XMLHttpRequest();
    requestHeader.open('GET', `json/${from}.json`);
    requestHeader.send();
    requestHeader.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            obj = JSON.parse(this.response);

            contentConstructor(obj.author, obj.date, obj.title);
            contentProvider(obj.path.content);

            setTimeout(() => {
                loadFeatures(obj.path.script, obj.titleCardColor);
            }, 200);

        } else if (this.status == 404) {
            contentNotFound();
        } else {''};
    };
        
};

requestPost('p0002');