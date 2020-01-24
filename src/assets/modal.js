let modal = document.getElementById("myModal");

let span = document.getElementsByClassName("avengers-modal-close")[0];

function abrirTermos() {
  modal.style.display = "block";
}

async function aceitarTermos() {
  fecharTermos();

  await enviarDados();
}

function recusarTermos() {
  window.alert("É necessário aceitar a política de privacidade para prosseguir.");
  fecharTermos();
}
function fecharTermos() {
  modal.style.display = "none";
}