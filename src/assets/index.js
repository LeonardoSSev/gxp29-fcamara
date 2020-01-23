let arrPosts = [];

const gamaURL = 'https://smtl.gama.academy/leads/3d8521c0-39f4-11ea-a319-e90cfbc180ef';
const avengersURL = 'https://api-blog-gama.herokuapp.com/userSubscription';

function closeFooter(){
    document.getElementById('footer-popup-news').style.display = 'none';
}

function getPosts(){
    const UTL_TO_FETCH = 'https://api-blog-gama.herokuapp.com/posts';

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

function limpaFeed(){
    //limpa principal
    let divPrincip = document.getElementById('principal-new')
    let listelems = divPrincip.getElementsByClassName('to-remove')

    while (listelems.length > 0) {
        divPrincip.removeChild(listelems.item(0));
    }
    
    //limpa restante
     let otherCards = document.getElementById('other-cards');
     let listCards = otherCards.getElementsByClassName('to-remove')

    while (listCards.length > 0) {
        otherCards.removeChild(listCards.item(0));
    }
}

function populaBlog(result){

    //Aqui cria o post principal, que eu imagina que seja o último postado --------------------
    let containerPrincipal = document.getElementById('principal-new');
    //deixa escondido
    containerPrincipal.style.opacity = 0;
    //imagem principal
    let imgPrinc = document.createElement('img');
    imgPrinc.src = result[result.length - 1].imgSrc;
    imgPrinc.className = 'img-fluid to-remove';
    imgPrinc.alt = result[result.length - 1].imgAlt;
    imgPrinc.title = result[result.length - 1].imgTitle;
    //append no container 
    containerPrincipal.appendChild(imgPrinc);
    //h1 principal
    let h1Princ = document.createElement('h1');
    h1Princ.innerText = result[result.length - 1].titulo;
    //p principal
    let pPrinc = document.createElement('p');
    pPrinc.style = 'width: 100%; word-break: break-all;'
    pPrinc.innerHTML = result[result.length - 1].corpo.substring(0, 200) + '...';
    //div
    let divPrinc = document.createElement('div');
    divPrinc.style = 'width: 100%;'
    divPrinc.className = 'principa-description to-remove';
    //a
    let aPrinc = document.createElement('a');
    aPrinc.href = 'post.html?tkn=' + result[result.length - 1]._id;
    aPrinc.className = 'primary';
    aPrinc.id = result[result.length - 1]._id;
    aPrinc.innerText = 'Continuar Lendo...'
    //append do h1 e p na div 
    divPrinc.appendChild(h1Princ);
    divPrinc.appendChild(pPrinc);
    divPrinc.appendChild(aPrinc);
    //append do div no container
    containerPrincipal.appendChild(divPrinc);
    

    //Aqui popula o restante dos cards com os posts restantes --------------------
    let otherCards = document.getElementById('other-cards');

    //deixa escondido
    otherCards.style.opacity = 0;

    result.slice(0, result.length - 1).reverse().forEach(element => {
        //p
        let p = document.createElement('p');
        p.className = 'card-text';
        p.innerText = element.corpo.substring(0, 100) + '...';
        //h5
        let h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.innerHTML = element.titulo.substring(0, 100);
        //a
        let a = document.createElement('a');
        a.href = 'post.html?tkn=' + element._id;
        a.className = 'primary';
        a.id = element._id;
        a.innerText = 'Continuar Lendo...'
        //div1 
        let div1 = document.createElement('div');
        div1.className = 'card-body'
        //append nos childs
        div1.appendChild(h5);
        div1.appendChild(p);
        div1.appendChild(a);
        //img
        let img = document.createElement('img');
        img.src = element.imgSrc;
        img.className = 'card-img-top';
        img.alt = '...';
        //div 2
        let div2 = document.createElement('div');
        div2.className = 'card';
        div2.style = 'width: 18rem; padding: 16px;';
        //append da img e da div1 na div2
        div2.appendChild(img);
        div2.appendChild(div1);
        //div3
        let div3 = document.createElement('div');
        div3.className = 'col-md-6 mb-4 to-remove';
        div3.appendChild(div2);

        otherCards.appendChild(div3)
    });

    //Esconde loading
    document.getElementById('loading-gif').style.display = 'none';

    //mostra os elementos
    containerPrincipal.style.opacity = 1;
    otherCards.style.opacity = 1;

}

function incredibleSearch(event){
    let searched = arrPosts.filter((post) => {
        return post.titulo.includes(event.target.value);
    });

    limpaFeed();

   if(searched.length > 0){
    populaBlog(searched);
   }
}

function trocaCategoria(event){
    let clicked = event.target.innerText;

    limpaFeed();

    let listResultCategoria = arrPosts.filter((post) => {
        return post.keyWord === clicked;
    })

    if(listResultCategoria.length > 0){
        populaBlog(listResultCategoria)
    }
    
}

async function enviarDados(event) {
  // Evita ação de submit
  event.preventDefault();

  // Pega valores dos inputs relacionados ao evento de submit
  let inputs = event.target.elements;

  let inputNameValue = '';
  let inputEmailValue = '';
  let inputContextValue = '';

  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];

    if (input.name === 'name') {
      inputNameValue = input.value;
    }
    if (input.name === 'email') {
      inputEmailValue = input.value;
    }
    if (input.name === 'context') {
      inputContextValue = input.value;
    }
  }

  await enviarDadosPraAvengers(inputNameValue, inputEmailValue, inputContextValue);
  await enviarDadosGama(inputNameValue, inputEmailValue);
}

async function enviarDadosGama(name, email) {
  const body = new URLSearchParams({
    'name': name,
    'email': email
  });

  const requestOptions = {
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    mode: 'cors'
  };

  const response = await fetch(gamaURL, requestOptions);
}

async function enviarDadosPraAvengers(nome, email, contexto) {
  const body = JSON.stringify({
    nome,
    email,
    contexto
  });

  const requestOptions = {
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
  };

  const response = await fetch(avengersURL, requestOptions);
}