// Récupération de l'élément "jef"
const jef = document.getElementById("jef");
var proStat = document.getElementById('proStat');
var timeData = document.getElementById('token');

// Définition de la limite supérieure
const limit = 4412;

// Définition de la durée de validité de la valeur de "jef" en jours
const validityPeriod = 25;

// Vérification de la validité de la valeur de "jef"
const storedJef = localStorage.getItem("jef");
let jefValue;
if (storedJef) {
  const { value, timestamp } = JSON.parse(storedJef);
  const ageInDays = (Date.now() - timestamp) / (24 * 60 * 60 * 1000);
  if (ageInDays <= validityPeriod && value < limit) {
    jefValue = value;
  }
}

// Si la valeur de "jef" n'est pas valide, génération d'une nouvelle valeur aléatoire
if (!jefValue) {
  jefValue = Math.floor(Math.random() * limit);
  localStorage.setItem("jef", JSON.stringify({ value: jefValue, timestamp: Date.now() }));
}

// Affichage de la valeur de "jef"
jef.innerText = jefValue;

// Récupération de l'élément du formulaire et du bouton de validation
const form = document.querySelector("form");
const input = form.querySelector("input");
const button = form.querySelector("button");

// Ajout d'un écouteur d'événements pour la soumission du formulaire
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Récupération de la valeur de l'input et conversion en nombre
  const inputValue = parseInt(input.value, 10);

  // Vérification de la validité de la valeur de l'input
  if (isNaN(inputValue)) {
    displayNotification("Error: Please enter a valid number.");
    return;
  }

  // Calcul de la somme de la valeur de "jef" et de l'input
  const sum = jefValue + inputValue;

  // Vérification de la somme
  if (sum === limit) {
    displayNotification("Mode Pro activé !");
    proStat.innerText = "Mode Pro Activé"
  } else {
    displayNotification("Error");
  }
});

// Fonction pour afficher une notification
function displayNotification(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.position = "fixed";
  notification.style.top = "10px";
  notification.style.right = "10px";
  notification.style.backgroundColor = "rgb(252, 252, 252)";
  notification.style.borderRadius = "10px";
  notification.style.padding = "10px";
  document.body.appendChild(notification);
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}