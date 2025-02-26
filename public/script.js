//////// FORMULÁRIO ////////////

/// chaves do parse
Parse.initialize(
    "xGSWIAwBRr1NY5JssvWcthAcOCKYUmPIkMTNAef8",
    "N2lFcwtSn4Wq7RKP0Ab8uU5SEiCmoJNJS2BO0vn4"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";
  
  
  
  
  ///////////////////////   Google  Login    /////////////////////////////
  
  function handleCredentialResponse(response) {
        console.log('Resposta completa:', response);
        
        const data = jwt_decode(response.credential);
        console.log('Dados decodificados:', data);
  
        // document.getElementById('name').textContent = data.name;
        // document.getElementById('sub').textContent = data.sub;
        // document.getElementById('givenName').textContent = data.given_name;
        // document.getElementById('familyName').textContent = data.family_name;
        // document.getElementById('email').textContent = data.email;
        // document.getElementById('email_verified').textContent = data.email_verif2ied;
        // document.getElementById('picture').setAttribute('src', data.picture);
    }
  
    window.onload = function () {
      google.accounts.id.initialize({
  
  
        ////Campo para por o ID Google Oauth////////////
        client_id: '512007654099-rd79o6qu5p50hamuvilp3ueevdshe7bd.apps.googleusercontent.com',
        ////////////////////////////////////////
        
        callback: handleCredentialResponse,
        debug: true
      });
  
      google.accounts.id.renderButton(
        document.getElementById("google_button"), {
            theme: "outline", 
            size: "large",
            type: "popup",
            shape: "circle",
            text: "signin_with",
            locale: "pt-BR",
            logo_alignment: "left"
        }  // customization attributes
      );
    }
  
  ///////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  
  const registerForm = document.getElementById("registerForm"); 
  const loginForm = document.getElementById("loginForm");
  const registerNameInput = document.getElementById("registerName"); 
  const registerEmailInput = document.getElementById("registerEmail"); 
  const registerPhoneInput = document.getElementById("registerPhone"); 
  const registerPasswordInput = document.getElementById("registerPassword");
  const loginEmailInput = document.getElementById("loginEmail"); 
  const loginPasswordInput = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn"); 
  const logoutBtn = document.getElementById("logoutBtn");
  const message = document.getElementById("message"); 
  const welcomeText = document.getElementById("welcome"); 
  const showLoginForm = document.getElementById("showLoginForm"); 
  const showRegisterForm = document.getElementById("showRegisterForm");
  
  
  
  //Função para verificar se o usuário já estava registrado
  async function checkUser() {
    const currentUser = Parse.User.current(); 
    if (currentUser) {
      const username = currentUser.get("name"); 
      welcomeText.textContent = `Bem-vindo, ${username}!`; 
      welcomeText.style.display = "block";
      registerForm.style.display = "none";
      loginForm.style.display = "none"; 
      logoutBtn.style.display = "block"; 
    }
  }
  
  async function login() {
    const email = loginEmailInput.value; 
    const password = loginPasswordInput.value;
    message.textContent = ""; 
  
    try {
      const user = await Parse.User.logIn(email, password); 
      message.textContent = "Login bem-sucedido!"; 
      message.style.color = "var(--success-color)"; 
      checkUser(); 
    } catch (error) {
      message.textContent = "Erro: " + error.message; 
      message.style.color = "var(--error-color)"; 
    }
  }
  
  async function register() {
    const name = registerNameInput.value.trim(); 
    const email = registerEmailInput.value.trim(); 
    const phone = registerPhoneInput.value.trim(); 
    const password = registerPasswordInput.value; 
    message.textContent = "";
  
    if (!name || !email || !phone || !password) {
      message.textContent = "Por favor, preencha todos os campos!";
      message.style.color = "var(--error-color)"; 
      return; 
    }
  
    const user = new Parse.User(); 
    user.set("username", email); 
    user.set("email", email); 
    user.set("password", password); 
    user.set("name", name); 
    user.set("phone", phone); 
  
    try {
      await user.signUp();
      message.textContent = "Cadastro realizado! Agora faça login."; 
      message.style.color = "var(--success-color)"; 
      showLoginForm.click(); 
    } catch (error) {
      message.textContent = "Erro: " + error.message; 
      message.style.color = "var(--error-color)"; 
    }
  }
  
  async function logout() {
    try {
      await Parse.User.logOut(); 
      message.textContent = "Você saiu!"; 
      message.style.color = "var(--success-color)"; 
      welcomeText.style.display = "none"; 
      registerForm.style.display = "block"; 
      loginForm.style.display = "none"; 
      logoutBtn.style.display = "none"; 
    } catch (error) {
      message.textContent = "Erro ao sair."; 
      message.style.color = "var(--error-color)"; 
    }
  }
  
  loginBtn.addEventListener("click", login); 
  registerBtn.addEventListener("click", register); 
  logoutBtn.addEventListener("click", logout); 
  
  showLoginForm.addEventListener("click", () => {
    registerForm.style.display = "none"; 
    loginForm.style.display = "block";
  });
  
  showRegisterForm.addEventListener("click", () => {
    loginForm.style.display = "none"; 
    registerForm.style.display = "block"; 
  });
  
  checkUser();
  