import GoTrue from '../node_modules/gotrue-js';

// Instantiate the GoTrue auth client with an optional configuration
const auth = new GoTrue({
  APIUrl: 'https://lightminedust.netlify.app/.netlify/identity',
  audience: '',
  setCookie: true,
});

const emailInput = document.getElementById('mail');
const passwordInput = document.getElementById('password');
const form = document.getElementById('login-form');

// Handle form submission event
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Validate inputs
  if (!email || !password) {
    console.log('Please fill in all fields');
    return;
  }

  // Log in user
  auth
    .login(email, password)
    .then((response) => {
      console.log('User logged in', response);
      // Redirect to success page
      window.location.href = '../Html/index_2.html';
    })
    .catch((error) => console.log("It's an error", error));
});
