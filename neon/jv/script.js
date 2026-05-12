const defaultPassword = "Admin1234";
const usersKey = "basicNeonUsers";
const activeUserKey = "basicNeonActiveUser";

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const loginMessage = document.querySelector("#loginMessage");
const registerMessage = document.querySelector("#registerMessage");

function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey)) || [];
}

function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

function showMessage(element, text, isError = false) {
  element.textContent = text;
  element.classList.toggle("error", isError);
}

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#registerName").value.trim();
  const email = document.querySelector("#registerEmail").value.trim().toLowerCase();
  const users = getUsers();

  if (users.some((user) => user.email === email)) {
    showMessage(registerMessage, "Ese correo ya existe. Prueba a iniciar sesion.", true);
    return;
  }

  users.push({ name, email, password: defaultPassword });
  saveUsers(users);
  registerForm.reset();
  showMessage(registerMessage, "Usuario creado. Ahora inicia sesion con tu contraseña.");
  showMessage(loginMessage, "");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim().toLowerCase();
  const password = document.querySelector("#loginPassword").value;
  const user = getUsers().find((savedUser) => savedUser.email === email);

  if (!user) {
    showMessage(loginMessage, "Usuario no encontrado. Crea el usuario primero.", true);
    return;
  }

  if (password !== defaultPassword) {
    showMessage(loginMessage, "Contrasena incorrecta.", true);
    return;
  }

  localStorage.setItem(activeUserKey, JSON.stringify(user));
  window.location.href = "dashboard.html";
});
