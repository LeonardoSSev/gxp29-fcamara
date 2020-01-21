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
        populaBlog(result[0]);
    })
    .catch((error) => {
        console.log(error.json());
    })
}

function populaBlog(result){
    let containerPrincipal = document.getElementById('principal-new');
    console.log(result);
    containerPrincipal.getElementsByTagName('h1')[0].innerText = result.titulo;
    containerPrincipal.getElementsByTagName('p')[0].innerText = result.corpo;
}