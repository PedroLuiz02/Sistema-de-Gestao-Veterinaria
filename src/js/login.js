let logout;
document.onmousemove = resetTimer;

function resetTimer() {
  clearTimeout(logout);
  logout = setTimeout(() => {
    alert("Sessão expirada!");
    window.location.href = "index.html";
  }, 60000);
}

(function init() {
  if (!localStorage.getItem('listaUser')) {
      localStorage.setItem('listaUser', JSON.stringify([
          { nomeCad: 'admin', emailCad: 'admin@svet.com', senhaCad: '123456' }
      ]));
  }
})();

function Logar(){
  let email = document.querySelector('#email')
  let emailLabel = document.querySelector('#emailLabel')

  let senha = document.querySelector('#senha')
  let senhaLabel = document.querySelector('#senhaLabel')

  let msgError = document.querySelector('#msgError')
  let listaUser = JSON.parse(localStorage.getItem('listaUser')) || []

  let userValid = { nome: '', email: '', senha: '' };

  listaUser.forEach((item) => {
      if(email.value == item.emailCad && senha.value == item.senhaCad){
          userValid = {
             nome: item.nomeCad,
             email: item.emailCad,
             senha: item.senhaCad
          }
      }
  });

  if(email.value == userValid.email && senha.value == userValid.senha){
      window.location.href = '../pages/landing.html'
      let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
      
      localStorage.setItem('token', token)
      localStorage.setItem('usuarioLogado', JSON.stringify(userValid))
  }else{
      alert('Email ou Senha Incorretos')
      email.value = '';
      senha.value = '';
      email.focus()
  }
}
