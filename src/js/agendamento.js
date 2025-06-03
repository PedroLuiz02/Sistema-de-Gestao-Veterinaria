function atualizarListaAnimal() {
  const select = document.getElementById("animalSelect");
  const animais = JSON.parse(localStorage.getItem("listaAnimais")) || [];

  select.innerHTML = '<option value="">Selecione um animal</option>';

  animais.forEach((item) => {
    select.innerHTML += `<option value="${item.nomeCad}">${item.nomeCad}</option>`;
  });
}
atualizarListaAnimal();

function atualizarListaVet() {
  const select = document.getElementById("veterinarioSelect");
  const veterinarios = JSON.parse(localStorage.getItem("listaVet")) || [];

  select.innerHTML = '<option value="">Selecione um veterinario</option>';

  veterinarios.forEach((item) => {
    select.innerHTML += `<option value="${item.nomeCad}">${item.nomeCad}</option>`;
  });
}
atualizarListaVet();