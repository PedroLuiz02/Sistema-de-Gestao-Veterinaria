export class Animal {
  constructor(nome, especie, raca, idade, peso, tutor) {
    this.nome = nome;
    this.especie = especie;
    this.raca = raca;
    this.idade = idade;
    this.peso = peso;
    this.tutor = tutor;
    this.historico = [];
  }

  adicionarConsulta(consulta) {
    this.historico.push(consulta);
  }
}
