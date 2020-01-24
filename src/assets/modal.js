let isTermosAceitos = false;

let modal = document.getElementById("myModal");

let span = document.getElementsByClassName("avengers-modal-close")[0];


function abrirTermos() {
  modal.style.display = "block";
}

function aceitarTermos() {
  isTermosAceitos = true;
  fecharTermos();
}

function recusarTermos() {
  isTermosAceitos = false;
  fecharTermos();
}
function fecharTermos() {
  modal.style.display = "none";
}