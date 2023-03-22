<?php
// Vérifie que les données ont été soumises par la méthode POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupère les données soumises
    $name = $_POST['Name'] ?? '';
    $prenom = $_POST['Prenom'] ?? '';
    $age = $_POST['Age'] ?? '';
    $email = $_POST['Mail'] ?? '';
    $password = $_POST['Password'] ?? '';

    // Lit les données existantes depuis le fichier data.json
    $jsonData = file_get_contents('../data/data.json');
    $data = json_decode($jsonData, true);

    // Ajoute les nouvelles données au tableau existant
    $newData = [
        'name' => $name,
        'prenom' => $prenom,
        'age' => $age,
        'email' => $email,
        'password' => $password,
    ];
    $data[] = $newData;

    // Écrit les données mises à jour dans le fichier data.json
    $jsonData = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents('../data/data.json', $jsonData);
    
    // Redirige l'utilisateur vers une autre page
    header('Location: ');
    exit;
}
?>
