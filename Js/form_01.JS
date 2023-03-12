const subButton = document.getElementById('submitButton');
const form = document.getElementById('myForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Met la souris en mode "progress"
    document.body.style.cursor = 'progress';
    
    const data = new FormData(form);
    const object = {};
    data.forEach(function(value, key) {
      object[key] = value;
    });
    const json = JSON.stringify(object);

    // Affiche les données dans la console
    console.log(object);

    // Enregistre les données dans un fichier JSON
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../data/dataForm.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('Enregistrement réussi');
      } else {
        console.log('Erreur lors de l\'enregistrement : ' + xhr.status);
      }
      // Remet la souris en mode normal
      document.body.style.cursor = 'default';
      subButton.textContent = 'Loading...'
    };
    xhr.send(json);
  });