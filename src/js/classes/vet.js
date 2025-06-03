export class Veterinario {
  constructor(nome, crmv, especialidade) {
    this.nome = nome;
    this.crmv = crmv;
    this.especialidade = especialidade;
    this.consultas = [];
  }

  adicionarConsulta(consulta) {
    this.consultas.push(consulta);
  }
}
