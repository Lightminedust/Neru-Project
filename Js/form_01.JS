const form = document.getElementById("myform");
const submitButton = document.getElementById('submitButton');

submitButton.addEventListener("click", function(event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre
  
  // Remplacer le texte du bouton par "Loading..."
  submitButton.textContent = "Loading...";
  submitButton.style.cursor = 'progress';

  // Récupérer les valeurs des champs de saisie
  const name = form.elements["Name"].value;
  const prenom = form.elements["Prenom"].value;
  const age = form.elements["Age"].value;
  const mail = form.elements["Mail"].value;
  const password = form.elements["Password"].value;

  // Créer un objet JSON avec les valeurs des champs de saisie
  const formData = {
    "Nom": name,
    "Prénom": prenom,
    "Age": age,
    "Email": mail,
    "Mot de passe": password
  };
  console.log(formData)
  // Envoyer l'objet JSON au serveur via une requête AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/dataForm");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Remplacer le texte du bouton par "S'inscrire"
      submitButton.textContent = "S'inscrire";
      // Réinitialiser le curseur du bouton
      submitButton.style.cursor = 'pointer';
      // Afficher un message de confirmation
      alert("Les données ont été enregistrées avec succès !");
    }
  };
  xhr.send(JSON.stringify(formData));
});

// Ajouter le code suivant pour empêcher l'utilisateur de cliquer plusieurs fois sur le bouton d'inscription
// tant que toutes les étapes de la requête AJAX ne sont pas terminées
document.addEventListener("readystatechange", function() {
  if (document.readyState !== "complete") {
    // Désactiver le bouton d'inscription
    submitButton.disabled = true;
    // Changer le texte du bouton d'inscription en "Loading..."
    submitButton.textContent = "Loading...";
  }
});

window.addEventListener("load", function() {
  // Réactiver le bouton d'inscription une fois que la page est chargée
  submitButton.disabled = false;
  // Réinitialiser le texte du bouton d'inscription en "S'inscrire"
  submitButton.textContent = "S'inscrire";
});
