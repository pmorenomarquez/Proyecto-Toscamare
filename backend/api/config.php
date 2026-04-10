<?php
// backend/api/config.php

// Configuración de correo para PHPMailer (SMTP IONOS)

return [
    'smtp' => [
        'host' => 'smtp.ionos.es',
        'port' => 587,
        'encryption' => 'tls',
    ],
    'pedidos' => [
        'email_destino' => 'pedidos@cialtoscamare.es',
        'password' => '7z3XPbY4XrecXML5DRwzvL3RUKeAdLp6',
    ],
    'contacto' => [
        'email_destino' => 'administracion@cialtoscamare.es',
        'password' => 'GAXGf8mW4psD7bPCm6VA64Ds5GJKY7FS',
    ]
];
