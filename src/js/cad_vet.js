function salvarVeterinario(vet) {
  let vets = JSON.parse(localStorage.getItem("veterinarios")) || [];
  vets.push(vet);
  localStorage.setItem("veterinarios", JSON.stringify(vets));
}