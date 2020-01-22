const popUpRegister = document.querySelector('.blog-register-news');

var myScrollFunc = function () {
    var y = window.scrollY;
    if (y >= 800) {
        popUpRegister.className = "bottomMenu show"
    } else {
        popUpRegister.className = "bottomMenu hide"
    }
};

window.addEventListener("scroll", myScrollFunc);