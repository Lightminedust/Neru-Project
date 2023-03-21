import GoTrue from '../node_modules/gotrue-js';

const auth = new GoTrue({
  APIUrl: "https://lightminedust.netlify.app/.netlify/identity",
  audience: "",
  setCookie: true,
});

const form = document.getElementById("myForm");
const email = document.getElementById("mail");
const password = document.getElementById("password");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailValue = email.value;
  const passwordValue = password.value;

  auth.login(emailValue, passwordValue, true)
    .then((response) => {
      showMessage(`Success! Response: ${JSON.stringify({ response })}`, form);
      window.location.href = "../Html/index_2.html";
    })
    .catch((error) => showMessage(`Failed :( ${JSON.stringify(error)}`, form));
});
