function AtualizarAnimaisEVeterinarios() {
  const animais = JSON.parse(localStorage.getItem("listaAnimais")) || [];
  const select = document.getElementById("animalSelect");
  select.innerHTML = '<option value="">Selecione um animal</option>';

  animais.forEach(animal => {
    const option = document.createElement('option');
    option.value = animal.nomeCad;
    option.textContent = animal.nomeCad;
    select.appendChild(option);
  });

  const veterinarios = JSON.parse(localStorage.getItem("listaVet")) || [];
  const selectVet = document.getElementById("veterinarioSelect");
  selectVet.innerHTML = '<option value="">Selecione um veterinário</option>';

  veterinarios.forEach(vet => {
    const option = document.createElement('option');
    option.value = vet.nomeCad;
    option.textContent = vet.nomeCad;
    selectVet.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', AtualizarAnimaisEVeterinarios);

import { Clinica } from '../../src/js/classes/clinica.js';
import { Animal } from '../../src/js/classes/animal.js';
import { Veterinario } from '../../src/js/classes/vet.js';
import { Consulta } from '../../src/js/classes/Consulta.js';

let clinica;

// Carregar a clínica direto do localStorage ou cria uma nova
function carregarClinica() {
  const clinicaSalva = localStorage.getItem("clinica");
  if (clinicaSalva) {
    const dados = JSON.parse(clinicaSalva);
    clinica = new Clinica(dados.nome);
    
    dados.animais.forEach(a => {
      const animal = new Animal(a.nome, a.especie, a.raca, a.idade, a.peso, a.tutor);
      animal.historico = a.historico || [];
      clinica.adicionarAnimal(animal);
    });
    
    dados.veterinarios.forEach(v => {
      const vet = new Veterinario(v.nome, v.crmv, v.especialidade);
      vet.consultas = v.consultas || [];
      clinica.adicionarVeterinario(vet);
    });
    
    dados.consultas.forEach(c => {
      const animal = clinica.buscarAnimalPorNome(c.animal.nome);
      const vet = clinica.buscarVeterinarioPorNome(c.veterinario.nome);
      
      if (animal && vet) {
        const consulta = new Consulta(animal, vet, c.data, c.motivo);
        consulta.realizada = c.realizada;
        consulta.observacoes = c.observacoes;
        clinica.agendarConsulta(consulta);
      }
    });
  } else {
    clinica = new Clinica("Clínica Pet Vida");
    salvarClinica();
  }
}

// Salva a clínica no localStorage
function salvarClinica() {
  localStorage.setItem("clinica", JSON.stringify(clinica));
}

// Atualiza os selects de animais e veterinários
function atualizarListas() {
  const animalSelect = document.getElementById("animalSelect");
  const vetSelect = document.getElementById("veterinarioSelect");
  const modalAnimalSelect = document.getElementById("M_animalSelect");
  const modalVetSelect = document.getElementById("M_veterinarioSelect");
  
  animalSelect.innerHTML = '<option value="">Selecione um animal</option>';
  vetSelect.innerHTML = '<option value="">Selecione um veterinário</option>';
  modalAnimalSelect.innerHTML = '<option value="">Selecione um animal</option>';
  modalVetSelect.innerHTML = '<option value="">Selecione um veterinário</option>';
  
  // Preenche com os animais
  clinica.animais.forEach(animal => {
    const option = `<option value="${animal.nome}">${animal.nome} (${animal.especie})</option>`;
    animalSelect.innerHTML += option;
    modalAnimalSelect.innerHTML += option;
  });
  
  // Preenche com os veterinários
  clinica.veterinarios.forEach(vet => {
    const option = `<option value="${vet.nome}">${vet.nome} (${vet.especialidade})</option>`;
    vetSelect.innerHTML += option;
    modalVetSelect.innerHTML += option;
  });
}

// Carrega a tabela de consultas
function carregarConsultas() {
  const tbody = document.getElementById("AgendamentoTBody");
  tbody.innerHTML = "";
  
  const consultas = clinica.listarConsultas();
  
  if (consultas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhuma consulta agendada</td></tr>';
    return;
  }
  
  // Ordena por data
  consultas.sort((a, b) => new Date(a.data) - new Date(b.data));
  
  consultas.forEach(consulta => {
    const dataFormatada = formatarData(consulta.data);
    const realizadaClass = consulta.realizada ? "text-decoration-line-through text-muted" : "";
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td class="${realizadaClass}">${consulta.animal.nome}</td>
    <td class="${realizadaClass}">${consulta.veterinario.nome}</td>
    <td class="${realizadaClass}">${dataFormatada}</td>
    <td class="${realizadaClass}">${consulta.motivo}</td>
    <td class="action">
      <button class="btn btn-warning btn-sm" onclick="editarConsulta('${consulta.animal.nome}', '${consulta.veterinario.nome}', '${consulta.data.toISOString()}')">Editar</button>
      <button class="btn btn-danger btn-sm ms-1" onclick="cancelarConsulta('${consulta.animal.nome}', '${consulta.veterinario.nome}', '${consulta.data.toISOString()}')">Cancelar</button>
    </td>
  `;
    
    tbody.appendChild(tr);
  });
}

// Formata a data para exibição
function formatarData(data) {
  const dt = new Date(data);
  return dt.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Mostra mensagens de erro e sucesso
function mostrarMensagem(tipo, mensagem) {
  const divErro = document.getElementById("msgError");
  const divSucesso = document.getElementById("msgSucess");
  
  divErro.innerHTML = "";
  divSucesso.innerHTML = "";
  
  if (tipo === "erro") {
    divErro.innerHTML = `<div class="alert alert-danger">${mensagem}</div>`;
  } else {
    divSucesso.innerHTML = `<div class="alert alert-success">${mensagem}</div>`;
  }
  
  setTimeout(() => {
    divErro.innerHTML = "";
    divSucesso.innerHTML = "";
  }, 5000);
}

// Agenda uma nova consulta
window.cadastrarConsulta = function() {
  const animalNome = document.getElementById("animalSelect").value;
  const vetNome = document.getElementById("veterinarioSelect").value;
  const data = document.getElementById("dataConsulta").value;
  const motivo = document.getElementById("motivo").value;
  
  try {
    if (!animalNome || !vetNome || !data || !motivo) {
      throw new Error("Preencha todos os campos!");
    }
    
    const animal = clinica.buscarAnimalPorNome(animalNome);
    const vet = clinica.buscarVeterinarioPorNome(vetNome);
    
    if (!animal || !vet) {
      throw new Error("Animal ou veterinário não encontrado!");
    }
    
    // Verifica o conflito de horário
    const conflito = clinica.consultas.some(c => 
      c.veterinario.nome === vetNome && 
      new Date(c.data).getTime() === new Date(data).getTime() &&
      !c.realizada
    );
    
    if (conflito) {
      throw new Error("Veterinário já possui consulta agendada neste horário!");
    }
    
    const consulta = new Consulta(animal, vet, data, motivo);
    clinica.agendarConsulta(consulta);
    salvarClinica();
    
    mostrarMensagem("sucesso", "Consulta agendada com sucesso!");
    document.getElementById("AgendamentoForm").reset();
    carregarConsultas();
  } catch (error) {
    mostrarMensagem("erro", error.message);
  }
}

// Edita uma consulta
window.editarConsulta = function(animalNome, vetNome, dataOriginal) {
  const consultaOriginal = clinica.consultas.find(c => 
    c.animal.nome === animalNome && 
    c.veterinario.nome === vetNome && 
    c.data.toISOString() === dataOriginal
  );
  
  if (!consultaOriginal) return;
  
  const modal = new bootstrap.Modal(document.getElementById('EditModal'));
  const modalAnimalSelect = document.getElementById("M_animalSelect");
  const modalVetSelect = document.getElementById("M_veterinarioSelect");
  const modalData = document.getElementById("M_dataAgendamento");
  const modalMotivo = document.getElementById("M_motivo");
  
  // Preenche o modal
  modalAnimalSelect.value = consultaOriginal.animal.nome;
  modalVetSelect.value = consultaOriginal.veterinario.nome;
  
  // Formata a data para o input
  const dt = new Date(consultaOriginal.data);
  const timezoneOffset = dt.getTimezoneOffset() * 60000;
  const localISOTime = new Date(dt - timezoneOffset).toISOString().slice(0, 16);
  modalData.value = localISOTime;
  
  modalMotivo.value = consultaOriginal.motivo;
  
  // Configura o botão de salvar
  document.getElementById("M_btnSalvar").onclick = function() {
    try {
      const novoAnimalNome = modalAnimalSelect.value;
      const novoVetNome = modalVetSelect.value;
      const novaData = modalData.value;
      const novoMotivo = modalMotivo.value;
      
      if (!novoAnimalNome || !novoVetNome || !novaData || !novoMotivo) {
        throw new Error("Preencha todos os campos!");
      }
      
      // Verifica se houve alteração
      if (novoAnimalNome !== animalNome || novoVetNome !== vetNome || novaData !== localISOTime) {
        // Verifica conflito de horário (excluindo a própria consulta)
        const conflito = clinica.consultas.some(c => 
          c.animal.nome !== animalNome &&
          c.veterinario.nome !== vetNome &&
          c.veterinario.nome === novoVetNome && 
          new Date(c.data).getTime() === new Date(novaData).getTime() &&
          !c.realizada
        );
        
        if (conflito) {
          throw new Error("Veterinário já possui consulta agendada neste horário!");
        }
      }
      
      // Atualiza a consulta
      consultaOriginal.animal = clinica.buscarAnimalPorNome(novoAnimalNome);
      consultaOriginal.veterinario = clinica.buscarVeterinarioPorNome(novoVetNome);
      consultaOriginal.data = new Date(novaData);
      consultaOriginal.motivo = novoMotivo;
      
      salvarClinica();
      mostrarMensagem("sucesso", "Consulta atualizada com sucesso!");
      carregarConsultas();
      modal.hide();
    } catch (error) {
      mostrarMensagem("erro", error.message);
    }
  };
  
  modal.show();
}

// Cancela uma consulta
window.cancelarConsulta = function(animalNome, vetNome, dataOriginal) {
  if (confirm("Tem certeza que deseja cancelar esta consulta?")) {
    const index = clinica.consultas.findIndex(c => 
      c.animal.nome === animalNome && 
      c.veterinario.nome === vetNome && 
      c.data.toISOString() === dataOriginal
    );
    
    if (index !== -1) {
      clinica.consultas.splice(index, 1);
      salvarClinica();
      mostrarMensagem("sucesso", "Consulta cancelada com sucesso!");
      carregarConsultas();
    } else {
      mostrarMensagem("erro", "Consulta não encontrada!");
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  carregarClinica();
  atualizarListas();
  carregarConsultas();
});