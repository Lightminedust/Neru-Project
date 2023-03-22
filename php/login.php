<?php

$data = file_get_contents('../data/data.json');
$users = json_decode($data, true);

$email = $_POST['email'];
$password = $_POST['password'];

foreach ($users as $user) {
    if ($user['email'] === $email && $user['password'] === $password) {
        $response = [
            'success' => true,
            'user' => [
                'email' => $user['email'],
                'nom' => $user['nom']
            ]
        ];
        echo json_encode($response);
        exit;
    }
}

$response = [
    'success' => false,
    'message' => 'Email ou mot de passe incorrect'
];

echo json_encode($response);
