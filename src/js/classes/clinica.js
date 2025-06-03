export class Clinica {
  constructor(nome) {
    this.nome = nome;
    this.animais = [];
    this.veterinarios = [];
    this.consultas = [];
  }

  adicionarAnimal(animal) {
    this.animais.push(animal);
  }

  adicionarVeterinario(vet) {
    this.veterinarios.push(vet);
  }

  agendarConsulta(consulta) {
    this.consultas.push(consulta);

    const animal = this.animais.find(a => a.nome === consulta.animal.nome);
    const vet = this.veterinarios.find(v => v.nome === consulta.veterinario.nome);

    if (animal) animal.adicionarConsulta(consulta);
    if (vet) vet.adicionarConsulta(consulta);
  }

  buscarAnimalPorNome(nome) {
    return this.animais.find(animal => animal.nome === nome);
  }

  buscarVeterinarioPorNome(nome) {
    return this.veterinarios.find(vet => vet.nome === nome);
  }

  listarConsultas() {
    return this.consultas;
  }
}

localStorage.setItem("clinica", JSON.stringify(clinica));

