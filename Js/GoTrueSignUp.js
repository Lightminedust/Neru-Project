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
    // Prevent the form from reloading the page
    event.preventDefault();
  
    // Get the email and password values
    const emailValue = email.value;
    const passwordValue = password.value;
    auth.signup(email, password);
    // Call the auth.signup() method with email and password
    auth
      .signup(emailValue, passwordValue, {
        full_name: `${firstName.value} ${lastName.value}`,
        birthdate: birthday.value,
      })
      .then((response) => {
        console.log("Confirmation email sent", response);
    window.location.href = "../index.html";
      })
      .catch((error) => console.log("It's an error", error));
  });
  