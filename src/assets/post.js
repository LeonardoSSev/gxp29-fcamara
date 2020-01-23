function RecuperPostagem(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.get('tkn')){
        populaPost(urlParams.get('tkn'));
    }
}

function voltar(){
    window.location.href = 'index.html'
}

function populaPost(token){

    const UTL_TO_FETCH = 'https://api-blog-gama.herokuapp.com/post/' + token;

    fetch(UTL_TO_FETCH, {
        method: 'get'
    })
    .then((response) => response.json())
    .then((result) => {
        arrPosts = result;
        populaBlog(result);
    })
    .catch((error) => {
        console.log(error);
    })

}

function populaBlog(post){
    //Aqui cria o post principal, que eu imagina que seja o último postado --------------------
    let containerPrincipal = document.getElementById('principal-new');
    //deixa escondido
    containerPrincipal.style.opacity = 0;
    //imagem principal
    let imgPrinc = document.createElement('img');
    imgPrinc.src = post.imgSrc;
    imgPrinc.className = 'img-fluid to-remove';
    imgPrinc.alt = post.imgAlt;
    imgPrinc.title = post.imgTitle;
    //append no container 
    containerPrincipal.appendChild(imgPrinc);
    //h1 principal
    let h1Princ = document.createElement('h1');
    h1Princ.innerHTML = post.titulo;
    //p principal
    let pPrinc = document.createElement('p');
    pPrinc.innerHTML = post.corpo;
    //div
    let divPrinc = document.createElement('div');
    divPrinc.className = 'principa-description to-remove';
    //append do h1 e p na div 
    divPrinc.appendChild(h1Princ);
    divPrinc.appendChild(pPrinc);
    //append do div no container
    containerPrincipal.appendChild(divPrinc);

    //Esconde loading
    document.getElementById('loading-gif').style.display = 'none';

    //mostra os elementos
    containerPrincipal.style.opacity = 1;
}