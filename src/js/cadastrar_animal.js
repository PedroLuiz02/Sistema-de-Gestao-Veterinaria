let modal = document.querySelector('.modal-container')
let animalForm = document.querySelector('#animalForm')
let animalTBody = document.querySelector('#animalTBody')
let racaAnimal = document.querySelector('#racaAnimal')
let sexoAnimal = document.querySelector('#sexoAnimal')
let especieAnimal = document.querySelector('#especieAnimal')
let nomeAnimal = document.querySelector('#nomeAnimal')
let idadeAnimal = document.querySelector('#idadeAnimal')
let pesoAnimal = document.querySelector('#pesoAnimal')
let tutorAnimal = document.querySelector('#tutorAnimal')
let btnSalvar = document.querySelector('#btnSalvar')

let M_nomeAnimal = document.querySelector('#M_nomeAnimal')
let M_sexoAnimal = document.querySelector('#M_sexoAnimal')
let M_especieAnimal = document.querySelector('#M_especieAnimal')
let M_racaAnimal = document.querySelector('#M_racaAnimal')
let M_idadeAnimal = document.querySelector('#M_idadeAnimal')
let M_pesoAnimal = document.querySelector('#M_pesoAnimal')
let M_tutorAnimal = document.querySelector('#M_tutorAnimal')
let M_btnSalvar = document.querySelector('#M_btnSalvar')

let msgError = document.querySelector('#msgError')
let msgSucess = document.querySelector('#msgSucess')

let validNome = false
let validSexo = false
let validEspecie = false
let validRaca = false
let validIdade = false
let validPeso = false
let validTutor = false

let itens
let id

nomeAnimal.addEventListener('keyup', () => {
  if (nomeAnimal.value.length <= 2) {
    nomeAnimal.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    nomeAnimal.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

sexoAnimal.addEventListener('keyup', () => {
  if (sexoAnimal.value.length <= 2) {
    sexoAnimal.setAttribute('style', 'border-color: red')
    validSexo = false
  } else {
    sexoAnimal.setAttribute('style', 'border-color: green')
    validSexo = true
  }
})

especieAnimal.addEventListener('keyup', () => {
  if (especieAnimal.value.length <= 3) {
    especieAnimal.setAttribute('style', 'border-color: red')
    validEspecie = false
  } else {
    especieAnimal.setAttribute('style', 'border-color: green')
    validEspecie = true
  }
})

racaAnimal.addEventListener('keyup', () => {
  if (racaAnimal.value.length <= 3) {
    racaAnimal.setAttribute('style', 'border-color: red')
    validRaca = false
  } else {
    racaAnimal.setAttribute('style', 'border-color: green')
    validRaca = true
  }
})

idadeAnimal.addEventListener('keyup', () => {
  if (idadeAnimal.value.length <= 0) {
    idadeAnimal.setAttribute('style', 'border-color: red')
    validIdade = false
  } else {
    idadeAnimal.setAttribute('style', 'border-color: green')
    validIdade = true
  }
})

pesoAnimal.addEventListener('keyup', () => {
  if (pesoAnimal.value.length <= 0) {
    pesoAnimal.setAttribute('style', 'border-color: red')
    validPeso = false
  } else {
    pesoAnimal.setAttribute('style', 'border-color: green')
    validPeso = true
  }
})

tutorAnimal.addEventListener('keyup', () => {
  if (tutorAnimal.value.length <= 3) {
    tutorAnimal.setAttribute('style', 'border-color: red')
    validTutor = false
  } else {
    tutorAnimal.setAttribute('style', 'border-color: green')
    validTutor = true
  }
})

function cadastrarAnimal() {
    if (validNome && validSexo && validEspecie && validRaca && validIdade && validPeso && validTutor) {
      itens = JSON.parse(localStorage.getItem('listaAnimais')) || []
  
      const novoAnimal = {
        nomeCad: nomeAnimal.value,
        sexoCad: sexoAnimal.value,
        especieCad: especieAnimal.value,
        racaCad: racaAnimal.value,
        idadeCad: idadeAnimal.value,
        pesoCad: pesoAnimal.value,
        tutorCad: tutorAnimal.value
      }
  
      itens.push(novoAnimal)
      localStorage.setItem('listaAnimais', JSON.stringify(itens))
  
      msgSucess.style.display = 'block'
      msgSucess.innerHTML = '<strong>Veterinário cadastrado com sucesso!</strong>'
      msgError.style.display = 'none'
  
      setTimeout(() => {
        msgSucess.style.display = 'none'
      }, 2500)
  
      nomeAnimal.value = ''
      sexoAnimal.value = ''
      especieAnimal.value = ''
      racaAnimal.value = ''
      idadeAnimal.value = ''
      pesoAnimal.value = ''
      tutorAnimal.value = ''
  
      loadItens()
    } else {
      msgError.style.display = 'block'
      msgError.innerHTML = '<strong>Preencha os dados corretamente!</strong>'
      msgSucess.style.display = 'none'
  
      setTimeout(() => {
        msgError.style.display = 'none'
      }, 2500)
    }
  }

function loadItens() {
    itens = JSON.parse(localStorage.getItem('listaAnimais')) || []
    animalTBody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
  })
}

function getItensBD() {
  return JSON.parse(localStorage.getItem('listaAnimais')) || []
}

function setItensBD() {
  localStorage.setItem('listaAnimais', JSON.stringify(itens))
}

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nomeCad}</td>
      <td>${item.sexoCad}</td>
      <td>${item.especieCad}</td>
      <td>${item.racaCad}</td>
      <td>${item.idadeCad}</td>
      <td>${item.pesoCad}</td>
      <td>${item.tutorCad}</td>
      <td class="action">
        <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#EditModal" onclick="editItem(${index})">Editar</button>
        <button class="btn btn-danger" onclick="deleteItem(${index})">Deletar</button>
      </td>
    `
    animalTBody.appendChild(tr)
}

function editItem(index) {
    id = index
    const animal = itens[index]
  
    M_nomeAnimal.value = animal.nomeCad
    M_sexoAnimal.value = animal.sexoCad
    M_especieAnimal.value = animal.especieCad
    M_racaAnimal.value = animal.racaCad
    M_idadeAnimal.value = animal.idadeCad
    M_pesoAnimal.value = animal.pesoCad
    M_tutorAnimal.value = animal.tutorCad
}

function deleteItem(index) {
  const listaAnimais = JSON.parse(localStorage.getItem('listaAnimais')) || []
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

M_btnSalvar.addEventListener('click', () => {
  itens[id] = {
    nomeCad: M_nomeAnimal.value,
    sexoCad: M_sexoAnimal.value,
    especieCad: M_especieAnimal.value,
    racaCad: M_racaAnimal.value,
    idadeCad: M_idadeAnimal.value,
    pesoCad: M_pesoAnimal.value,
    tutorCad: M_tutorAnimal.value
  }  

  setItensBD()
  loadItens()

  const modal = bootstrap.Modal.getInstance(document.getElementById('EditModal'))
  modal.hide()
})

document.addEventListener('DOMContentLoaded', function () {
  loadItens()
})