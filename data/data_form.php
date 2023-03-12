<?php
// Ouvre le fichier JSON
$file = 'data.json';
$current_data = file_get_contents($file);

// Décodage du contenu JSON en tableau associatif
$array_data = json_decode($current_data, true);

// Ajout des données POST envoyées par le formulaire au tableau associatif
$form_data = array(
    'Name' => $_POST['Name'],
    'Prenom' => $_POST['Prenom'],
    'Age' => $_POST['Age'],
    'Mail' => $_POST['Mail'],
    'Password' => $_POST['Password']
);
$array_data[] = $form_data;

// Réencodage du tableau associatif en JSON
$json_data = json_encode($array_data, JSON_PRETTY_PRINT);

// Écriture du contenu JSON dans le fichier
file_put_contents($file, $json_data);

// Affichage des données dans la console
var_dump($form_data);

// Réponse HTTP
http_response_code(200);
?>
