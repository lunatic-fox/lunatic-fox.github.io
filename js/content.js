function contentConstructor(author, date, title) {
    id('content').innerHTML = `
        <div id="content-header">
            <div id="content-bd-box" class="fx">
                <div id="content-back"><img src="img/001.png" height="100%"></div>
                <div id="content-description">
                    Criado por: <span id="content-author">${author}</span><br>
                    Última modificação em: <span id="content-date">${date}</span>
                </div>
                </div>
            <div id="content-title-card" class="fx" >
                <div id="content-title">${title}</div>
            </div>
            <div id="content-body" class="fx blk">*</div>  
        </div>
    </div>`;
};

function notFound() {
    const img = 'img/000.png';
    const title = '404';
    const msg = 'Desculpe o inconveniente, provalvelmente essa parte está em construção, o autor esqueceu de vincular ou não teve tempo suficiente de carregar o conteúdo.';

    id('content').innerHTML = `
    <div id="no-content" class="fx">
        <img src="${img}">
        <div class="fx blk not-found-box">
            <div class="not-found-title">${title}
            </div>
            <div class="not-found-msg">${msg}
            </div>
        </div>
    </div>`;
};

// function createScript(path) {
//     if (path != '') {
//         const node = document.createElement('script');
//         node.id = 'temp-script';
//         node.src = path;
//         document.body.appendChild(node);
//     };
// };

// function removeScript(path) {
//     if (path != '') {
//         id('content-back').addEventListener('click', ()=> {
//             document.body.removeChild(id('temp-script'));
//         });
//     }
// };

function loadFeatures(path) {
    if (path != '') {
        const articles = document.getElementsByTagName('article');
        for(i = 0; i < articles.length; i++) {
            articles[i].classList = 'gone';
        };

        const content = id('content');
        content.classList = 'fx blk';

        const node = document.createElement('script');
        node.id = 'temp-script';
        node.src = path;
        document.body.appendChild(node);

        id('content-back').addEventListener('click', ()=> {
            document.body.removeChild(id('temp-script'));
            
            for(i = 0; i < articles.length; i++) {
                articles[i].classList = 'fx';
                //articles[i].style.display = 'block';
            };

            content.classList = 'gone';
            content.innerHTML = '';
        });
    } else {
        id('content-back').addEventListener('click', ()=> {
            console.log('no features!')
        });
    };
};

function content(path) {
    const requestContent = new XMLHttpRequest();
    requestContent.open('GET', path);
    requestContent.send();
    requestContent.onreadystatechange = ()=> {
        if (requestContent.readyState == 4
            && requestContent.status == 200) {
                document.getElementById('content-body').innerHTML = requestContent.responseText;

                playText();

                

        } else if (requestContent.readyState == 4
            && requestContent.status == 404){
                notFound();
        } else {''};
    };
};

function requestJSON(from) {
    let obj = '';

    const requestHeader = new XMLHttpRequest();
    requestHeader.open('GET', `json/${from}.json`);
    requestHeader.send();
    requestHeader.onreadystatechange = ()=> {

        if (requestHeader.readyState == 4 
            && requestHeader.status == 200) {

                obj = JSON.parse(requestHeader.response);

            contentConstructor(obj.author, obj.date, obj.title);
            content(obj.contentPath);


            ///////////////////////
            loadFeatures(obj.scriptPath);
            //////////////////

        } else if (requestHeader.readyState == 4 
            && requestHeader.status == 404) {
            notFound();
        } else {''};
    };
        
};


id('p0002').addEventListener('click', ()=> {
    requestJSON('p0002');
});
