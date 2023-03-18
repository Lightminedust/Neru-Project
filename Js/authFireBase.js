const apiKeyOpenAi = "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";
const chatForm = document.querySelector("#entry form");
const dialogBox = document.getElementById('chatMess');

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
  userMessage.style.marginLeft = "60vh"
  userMessage.style.width = "80%";
  dialogBox.appendChild(userMessage);

  // Envoyer la requête à l'API OpenAI
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKeyOpenAi,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt:
        "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: " +
        userInput +
        "\nAI:",
      temperature: 0.2,
      max_tokens: 4000,
      top_p: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    }),
  };

  fetch("https://api.openai.com/v1/completions", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const aiMessage = document.createElement("div");
      aiMessage.innerHTML = data.choices[0].text.replace(/\n/g, "<br>");
      aiMessage.classList.add("ai-message");
      aiMessage.style.width = "50%";
      aiMessage.style.backgroundColor = "#ffffff";
      aiMessage.style.borderRadius = "15px";
      aiMessage.style.marginLeft = "60vh"
      aiMessage.style.padding = '10px'
      aiMessage.style.textAlign = 'justify';
      dialogBox.appendChild(aiMessage);
      // Faire défiler la boîte de chat vers le bas après chaque nouveau message ajouté
      scrollToBottom();
    })
    .catch((error) => console.log(error));

  // Effacer l'entrée utilisateur
  document.querySelector("#entryField").value = "";
});
