let arrPosts = [];

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

function populaBlog(result){
    //Aqui cria o post principal, que eu imagina que seja o último postado
    let containerPrincipal = document.getElementById('principal-new');
    containerPrincipal.getElementsByTagName('h1')[0].innerText = result[result.length - 1].titulo;
    containerPrincipal.getElementsByTagName('p')[0].innerText = result[result.length - 1].corpo.substring(0, 200);

    //Aqui popula o restante dos cards com os posts restantes
    let otherCards = document.getElementById('other-cards');

    result.slice(0, result.length - 1).reverse().forEach(element => {
        //p
        let p = document.createElement('p');
        p.className = 'card-text';
        p.innerText = element.corpo.substring(0, 100);
        //h5
        let h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.innerText = element.titulo.substring(0, 100);
        //a
        let a = document.createElement('a');
        a.href = '#';
        a.className = 'primary';
        a.id = result._id;
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
        img.src = 'https://picsum.photos/358/245';
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
        div3.className = 'col-md-6 mb-4';
        div3.appendChild(div2);

        otherCards.appendChild(div3)
    });
}

function incredibleSearch(event){
    //Corrigir
    let searched = arrPosts.filter((post) => {
        return post.titulo.includes(event);
    });
    populaBlog(searched);
}