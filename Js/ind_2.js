// Récupérer les éléments du DOM
const entryField = document.getElementById("entryField");
const dialogBox = document.getElementById("dialogBox");

// Ajouter un gestionnaire d'événements pour le formulaire d'envoi
document.querySelector("form").addEventListener("submit", (event) => {
    // Empêcher le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Récupérer la valeur de l'entrée utilisateur
    const userInput = entryField.value.trim();

    // Ne rien faire si l'entrée est vide
    if (userInput === "") {
        return;
    }

    // Ajouter le message de l'utilisateur au dialogue
    const userMessage = document.createElement("div");
    userMessage.innerHTML = userInput.replace(/\n/g, "<br>");
    userMessage.classList.add("user-message");
    dialogBox.appendChild(userMessage);
    userMessage.style.width = '100%'
    userMessage.style.minHeight = '10vh'
    userMessage.style.backgroundColor = '#9eabb4';
    userMessage.style.borderRadius = "15px"
    userMessage.style.paddingLeft = "10px"
    // Effacer l'entrée utilisateur
    entryField.value = "";

    // Faire défiler la boîte de dialogue jusqu'au bas pour afficher le nouveau message
    dialogBox.scrollTop = dialogBox.scrollHeight;

});
