var restreint = document.getElementById('restreint');
var proStat = document.getElementById('proStat')
var formInput = document.getElementById('chatForm')
var timeLapse = document.getElementById('timeLapse')
// Vérifier si la valeur de jef est déjà stockée dans localStorage
let d_Almeida = false;
let timeElapsed = 75; // exemple de temps écoulé en minutes
let dailyTimeUsed = 0; // temps d'utilisation déjà écoulé pour la journée
let jikan;

function disableForm() {
  const form = document.getElementById('chatForm');
  form.style.pointerEvents = 'none';
  form.style.opacity = '0.5';
}

let jef = localStorage.getItem('jef');

// Si la valeur n'est pas stockée, la générer aléatoirement
if (!jef) {
  jef = Math.floor(Math.random() * 4412);
  localStorage.setItem('jef', jef);
}

// Vérifier si 25 jours se sont écoulés depuis la dernière mise à jour de jef
const now = new Date();
const lastUpdate = new Date(localStorage.getItem('jefLastUpdate'));
const daysSinceLastUpdate = (now - lastUpdate) / (1000 * 60 * 60 * 24);

if (daysSinceLastUpdate >= 25) {
  // Si 25 jours se sont écoulés, générer une nouvelle valeur aléatoire pour jef
  jef = Math.floor(Math.random() * 4412);
  localStorage.setItem('jef', jef);
  localStorage.setItem('jefLastUpdate', now);
}

var jefna = document.getElementById('jef'); 
jefna.innerText = `${jef}`

// récupérer l'élément du formulaire et ajouter un écouteur d'événements lors de la soumission
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // empêche le rechargement de la page

  // récupérer la valeur entrée dans le formulaire
  const inputValue = parseInt(event.target.elements[0].value);

  // Vérifier si la valeur est un nombre et que la somme est égale à 4412
  if (!isNaN(inputValue) && jef + inputValue === 4412) {
    restreint = false;
    notification("Mode sans restriction activé");
    restreint.innerHTML = "Mode sans restriction"
    proStat.innerText = 'Mode Pro Activé'
    d_Almeida = true;
    jikan = "infinity"
  } else {
    notification("Le code est incorect");
  }
});

if (d_Almeida === false) {
  if (timeElapsed <= 01) {
    // temps d'utilisation restant pour les tout premiers utilisateurs
    const timeRemaining = 60 - timeElapsed;
    jikan = `${timeRemaining} min`;
    console.log(`Il vous reste ${jikan} d'utilisation.`);
  } else {
    // temps d'utilisation restant pour les utilisateurs ayant déjà utilisé la fonctionnalité
    const dailyTimeRemaining = Math.min(10, 60 - dailyTimeUsed);
    if (dailyTimeRemaining <= 0) {
      console.log('Vous avez atteint la limite quotidienne d\'utilisation.');
      disableForm(); // désactiver le formulaire
    } else {
      jikan = `${dailyTimeRemaining} min`;
      console.log(`Il vous reste ${jikan} d'utilisation pour aujourd'hui.`);
    }
  }
} else {
  console.log('Il n\'y a pas de restriction d\'utilisation.');
}

// fonction pour afficher les notifications
function notification(message) {
  // vérifier si le navigateur prend en charge les notifications
  if ('Notification' in window) {
    // demander la permission d'afficher les notifications si elle n'a pas encore été accordée
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // créer une nouvelle notification
    const notification = new Notification('Notification', {
      body: message,
    });
  }
}
timeLapse.innerText = `${jikan}`
