document.getElementById('myForm').addEventListener("submit", function (e) {
  e.preventDefault(); // empêche le formulaire de se soumettre normalement
  const name = document.getElementById('firstName').value;
  const prenom = document.getElementById('lastName').value;
  const age = document.getElementById('birthday').value;
  const mail = document.getElementById('mail').value;
  const password = document.getElementById('password').value;

  const data = {
    name: name,
    prenom: prenom,
    age: age,
    mail: mail,
    password: password,
  };

  // Envoie les données à PHP pour qu'il les stocke dans un fichier JSON
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../data/dataForm.php");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
});
