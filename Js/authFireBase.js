const apiKeyOpenAi = "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";
const chatForm = document.querySelector("#entry form");
const dialogBox = document.querySelector("#dialogBox");
const historique = document.querySelector("#historique");

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
  dialogBox.appendChild(userMessage);
  userMessage.style.width = "100%";
  userMessage.style.backgroundColor = "#9eabb4";
  userMessage.style.borderRadius = "15px";
  userMessage.style.paddingLeft = "10px";

  // Faire défiler la boîte de dialogue jusqu'au bas pour afficher le nouveau message
  dialogBox.scrollTop = dialogBox.scrollHeight;

  // Envoyer la requête à l'API OpenAI
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKeyOpenAi,
    },
    body: JSON.stringify({
      model: "text-davinci-002",
      prompt:
        "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: " +
        userInput +
        "\nAI:",
      temperature: 0.9,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    }),
  };

  fetch("https://api.openai.com/v1/completions", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const aiMessage = document.createElement("p");
      aiMessage.innerHTML = data.choices[0].text.replace(/\n/g, "<br>");
      aiMessage.classList.add("ai-message");
      dialogBox.appendChild(aiMessage);
      aiMessage.style.width = "95%";
      aiMessage.style.overflowY = 'scroll'
      aiMessage.style.backgroundColor = "#ffffff";
      aiMessage.style.borderRadius = "15px";
      aiMessage.style.paddingLeft = "10px";
      historique.appendChild(dialogBox);
      dialogBox.scrollTop = dialogBox.scrollHeight;
    })
    .catch((error) => console.log(error));


  // Effacer l'entrée utilisateur
  document.querySelector("#entryField").value = "";
});