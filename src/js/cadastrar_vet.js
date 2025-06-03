let modal = document.querySelector('.modal-container')
let vetForm = document.querySelector('#vetForm')
let vetTBody = document.querySelector('#vetTBody')
let nomeVet = document.querySelector('#nomeVet')
let vetCRMV = document.querySelector('#vetCRMV')
let especialidadeVet = document.querySelector('#especialidadeVet')
let btnSalvar = document.querySelector('#btnSalvar')

let M_nomeVet = document.querySelector('#M_nomeVet')
let M_vetCRMV = document.querySelector('#M_vetCRMV')
let M_especialidadeVet = document.querySelector('#M_especialidadeVet')
let M_btnSalvar = document.querySelector('#M_btnSalvar')

let msgError = document.querySelector('#msgError')
let msgSucess = document.querySelector('#msgSucess')

let validNome = false
let validCRMV = false
let validEspecialidade = false

let itens
let id

nomeVet.addEventListener('keyup', () => {
  if (nomeVet.value.length <= 2) {
    nomeVet.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    nomeVet.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

vetCRMV.addEventListener('keyup', () => {
  if (vetCRMV.value.length <= 2) {
    vetCRMV.setAttribute('style', 'border-color: red')
    validCRMV = false
  } else {
    vetCRMV.setAttribute('style', 'border-color: green')
    validCRMV = true
  }
})

especialidadeVet.addEventListener('keyup', () => {
  if (especialidadeVet.value.length <= 3) {
    especialidadeVet.setAttribute('style', 'border-color: red')
    validEspecialidade = false
  } else {
    especialidadeVet.setAttribute('style', 'border-color: green')
    validEspecialidade = true
  }
})

function cadastrarVet() {
    if (validNome && validCRMV && validEspecialidade) {
      itens = JSON.parse(localStorage.getItem('listaVet')) || []
  
      const novoVet = {
        nomeCad: nomeVet.value,
        CRMVCad: vetCRMV.value,
        especialidadeCad: especialidadeVet.value
      }
  
      itens.push(novoVet)
      localStorage.setItem('listaVet', JSON.stringify(itens))
  
      msgSucess.style.display = 'block'
      msgSucess.innerHTML = '<strong>Veterinário cadastrado com sucesso!</strong>'
      msgError.style.display = 'none'
  
      setTimeout(() => {
        msgSucess.style.display = 'none'
      }, 2500)
  
      nomeVet.value = ''
      vetCRMV.value = ''
      especialidadeVet.value = ''
  
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
    itens = JSON.parse(localStorage.getItem('listaVet')) || []
    vetTBody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
  })
}

function getItensBD() {
  return JSON.parse(localStorage.getItem('listaVet')) || []
}

function setItensBD() {
  localStorage.setItem('listaVet', JSON.stringify(itens))
}

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nomeCad}</td>
      <td>${item.CRMVCad}</td>
      <td>${item.especialidadeCad}</td>
      <td class="action">
        <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#EditModal" onclick="editItem(${index})">Editar</button>
        <button class="btn btn-danger" onclick="deleteItem(${index})">Deletar</button>
      </td>
    `
    vetTBody.appendChild(tr)
}

function editItem(index) {
    id = index
    const vet = itens[index]
  
    M_nomeVet.value = vet.nomeCad
    M_vetCRMV.value = vet.CRMVCad
    M_especialidadeVet.value = vet.especialidadeCad
}

function deleteItem(index) {
  const listaVet = JSON.parse(localStorage.getItem('listaVet')) || []
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

M_btnSalvar.addEventListener('click', () => {
  itens[id] = {
    nomeCad: M_nomeVet.value,
    CRMVCad: M_vetCRMV.value,
    especialidadeCad: M_especialidadeVet.value
  }  

  setItensBD()
  loadItens()

  const modal = bootstrap.Modal.getInstance(document.getElementById('EditModal'))
  modal.hide()
})

document.addEventListener('DOMContentLoaded', function () {
  loadItens()
})