export class Consulta {
  constructor(animal, veterinario, data, motivo) {
    this.animal = animal;
    this.veterinario = veterinario;
    this.data = new Date(data);
    this.motivo = motivo;
    this.realizada = false;
    this.observacoes = '';
  }

  Observacoes(obs) {
    this.observacoes = obs;
    this.realizada = true;
  }
}
