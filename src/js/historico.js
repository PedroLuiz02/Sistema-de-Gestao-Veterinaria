document.addEventListener('DOMContentLoaded', () => {
  const animalSelect = document.getElementById('animalSelect');
  const tabelaBody = document.querySelector('#tabelaHistorico tbody');

  function atualizarListaAnimal() {
    const animais = JSON.parse(localStorage.getItem('listaAnimais')) || [];
    animalSelect.innerHTML = '<option value="">Selecione</option>';
    animais.forEach((animal) => {
      animalSelect.innerHTML += `<option value="${animal.nomeCad}">${animal.nomeCad}</option>`;
    });
  }

  function mostrarHistorico(nomeAnimal) {
    const consultas = JSON.parse(localStorage.getItem('listaConsultas')) || [];
    const historico = consultas.filter(c => c.animal === nomeAnimal);

    tabelaBody.innerHTML = '';

    if (historico.length === 0) {
      tabelaBody.innerHTML = '<tr><td colspan="5">Nenhum atendimento encontrado.</td></tr>';
      return;
    }

    historico.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.data}</td>
        <td>${item.hora}</td>
        <td>${item.veterinario}</td>
        <td>${item.especialidade}</td>
        <td>${item.descricao}</td>
      `;
      tabelaBody.appendChild(tr);
    });
  }

  animalSelect.addEventListener('change', () => {
    if (animalSelect.value) {
      mostrarHistorico(animalSelect.value);
    } else {
      tabelaBody.innerHTML = '';
    }
  });

  atualizarListaAnimal();
});
