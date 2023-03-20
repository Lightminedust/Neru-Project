const apiKeyOpenAi = "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";
const chatForm = document.querySelector("#entry form");

var dialogBox = document.getElementById('chatMess_01');

var activeButton = null;

function showDiv(divId, button) {
  // Masquer toutes les divs
  var allDivs = document.querySelectorAll('div[id^="chatMess_"]');
  for (var i = 0; i < allDivs.length; i++) {
    allDivs[i].style.display = "none";
  }

  // Afficher la div sélectionnée
  var selectedDiv = document.getElementById(divId);
  selectedDiv.style.display = "flex";

  // Modifier l'id du dialogBox
  dialogBox = selectedDiv;

  // Changer la couleur du bouton actif
  if (activeButton) {
    activeButton.style.backgroundColor = '';
  }
  activeButton = button;
  activeButton.style.backgroundColor = 'rebeccapurple';
}



// Fonction pour faire défiler la boîte de chat vers le bas
function scrollToBottom() {
  dialogBox.scrollTop = dialogBox.scrollHeight;
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = document.querySelector("#entryField").value;
  if (!userInput) {
    return;
  }

  // Ajouter le message de l'utilisateur au dialogue
  const userMessage = document.createElement("div");
  userMessage.innerHTML = userInput.replace(/\n/g, "<br>");
  userMessage.classList.add("user-message");
  userMessage.style.position = 'relative';
  userMessage.style.right = '0'
  userMessage.style.marginLeft = "30%"
  userMessage.style.width = "80%";
  dialogBox.appendChild(userMessage);

// Ajouter une notification de chargement
const loadingNotification = document.createElement("div");
loadingNotification.style.position = 'fixed'
loadingNotification.style.right = '600px'
loadingNotification.style.background = 'white'
loadingNotification.style.borderRadius = "10px"
loadingNotification.style.height = '25px'
loadingNotification.style.width = '50px'
loadingNotification.style.top = '20px'
loadingNotification.style.right = '20px'
loadingNotification.textContent = "...";
loadingNotification.style.display = 'flex'
loadingNotification.style.alignItems = 'center'
loadingNotification.style.justifyContent = 'center'
dialogBox.appendChild(loadingNotification);


// Envoyer la requête à l'API OpenAI
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + apiKeyOpenAi,
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": userInput}],
    temperature: 0.1,
    max_tokens: 4000,
    top_p: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  }),
};
fetch("https://api.openai.com/v1/chat/completions", requestOptions)
.then((response) => response.json())
.then((data) => {
  console.log(data)

  // Supprimer la notification de chargement
  dialogBox.removeChild(loadingNotification);

  const aiMessage = document.createElement("div");
  const text = data.choices[0].message.content;

  // Ajouter la valeur de la div au contenu du stockage local du navigateur
  localStorage.setItem("aiMessage", text);

  aiMessage.innerHTML = text.replace(/\n/g, "<br>");
  aiMessage.classList.add("ai-message");
  aiMessage.style.width = "50%";
  aiMessage.style.backgroundColor = "#ffffff";
  aiMessage.style.borderRadius = "15px";
  aiMessage.style.marginLeft = "35%"
  aiMessage.style.padding = '10px'
  aiMessage.style.textAlign = 'justify';
  dialogBox.appendChild(aiMessage);
  // Effacer l'entrée utilisateur
  document.querySelector("#entryField").value = "";
  userInput.innerText = '';
  // Faire défiler la boîte de chat vers le bas après chaque nouveau message ajouté
  scrollToBottom();
})
  .catch((error) => console.log(error));

// Récupérer la valeur stockée dans le stockage local du navigateur lors du chargement de la page
window.onload = function() {
const aiMessage = localStorage.getItem("aiMessage");
if (aiMessage) {
  const aiMessageDiv = document.createElement("div");
  aiMessageDiv.innerHTML = aiMessage;
  aiMessageDiv.classList.add("ai-message");
  aiMessageDiv.style.width = "50%";
  aiMessageDiv.style.backgroundColor = "#ffffff";
  aiMessageDiv.style.borderRadius = "15px";
  aiMessageDiv.style.marginLeft = "60%"
  aiMessageDiv.style.padding = '10px'
  aiMessageDiv.style.textAlign = 'justify';
  dialogBox.appendChild(aiMessageDiv);
}
}
    .catch((error) => console.log(error));

});
const notificationBtn = document.getElementById('notifBtn');
const notificationDiv = document.getElementById('notif');

let notificationActive = false;

notificationBtn.addEventListener('click', () => {
  if (notificationActive) {
    notificationDiv.style.display = 'none';
    notificationBtn.classList.remove('active');
    notificationBtn.style.backgroundColor = ""
    notificationActive = false;
  } else {
    notificationDiv.style.display = 'block';
    notificationBtn.style.backgroundColor = "rgba(0, 56, 198, 0.698)"
    notificationBtn.classList.add('active');
    notificationActive = true;
  }
});

const divStats = document.getElementById('stats')
const statBtn = document.getElementById('dataStat')

divStats.style.display = 'none';

let dataActive = false;

statBtn.addEventListener('click', () => {
  if (dataActive) {
    divStats.style.display = 'none';
    statBtn.style.backgroundColor = '';
    dataActive = false;
  } else {
    divStats.style.display = 'flex';
    statBtn.style.backgroundColor = 'blue';
    dataActive = true;
  }
});
function clearChatMessages() {
  const chatMess1 = document.getElementById('chatMess_01');
  const chatMess2 = document.getElementById('chatMess_02');
  const chatMess3 = document.getElementById('chatMess_03');

  chatMess1.innerHTML = '';
  chatMess2.innerHTML = '';
  chatMess3.innerHTML = '';
}

const bill = document.getElementById('billing')
const billingBtn = document.getElementById('billingBtn')

bill.style.display = 'none';

let billActive = false;

billingBtn.addEventListener('click', () => {
  if (billActive) {
    bill.style.display = 'none';
    billingBtn.style.backgroundColor = '';
    billActive = false;
  } else {
    bill.style.display = 'flex';
    billingBtn.style.backgroundColor = 'blue';
    billActive = true;
  }
});
