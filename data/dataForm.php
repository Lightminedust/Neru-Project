<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["Name"];
  $prenom = $_POST["Prenom"];
  $age = $_POST["Age"];
  $mail = $_POST["Mail"];
  $password = $_POST["Password"];

  // Créer un objet JSON avec les valeurs des champs de saisie
  $formData = array(
    "Nom" => $name,
    "Prénom" => $prenom,
    "Age" => $age,
    "Email" => $mail,
    "Mot de passe" => $password
  );

  // Écrire les données JSON dans un fichier
  $file_path = "../data/data.json";
  $file = fopen($file_path, 'w');
  fwrite($file, json_encode($formData));
  fclose($file);

  // Répondre avec un message de confirmation
  $response = array('message' => 'Les données ont été enregistrées avec succès !');
  echo json_encode($response);
}
?>
