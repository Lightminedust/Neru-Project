// Récupérer les éléments du DOM
const entryField = document.getElementById("entryField");
const dialogBox = document.getElementById("dialogBox");
const historique = document.getElementById("historique");

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

    let apiKeyOpenAi = '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'

    // Envoyer la question de l'utilisateur à l'API
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKeyOpenAi
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 100,
            temperature: 0.5
        })
    })
    .then(response => response.json())
    .then(data => {
        // Ajouter la réponse de l'API à la boîte de dialogue
        const aiMessage = document.createElement("div");
        aiMessage.innerHTML = 'https://api.openai.com/v1/chat/completions';
        aiMessage.classList.add("ai-message");
        historique.appendChild(aiMessage);
        aiMessage.style.width = '100%'
        aiMessage.style.minHeight = '10vh'
        aiMessage.style.backgroundColor = '#f0f2f5';
        aiMessage.style.borderRadius = "15px"
        aiMessage.style.paddingLeft = "10px"
        // Faire défiler la boîte de dialogue jusqu'au bas pour afficher le nouveau message
        historique.scrollTop = historique.scrollHeight;
    })
    .catch(error => console.error(error));
    console.log(data)
});

