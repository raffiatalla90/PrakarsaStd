<?php

/*
|--------------------------------------------------------------------------
| SEO defaults (server-rendered)
|--------------------------------------------------------------------------
|
| The site is an Inertia SPA: without server-rendered head tags, crawlers
| and social scrapers see an empty <div id="app"></div>. These values are
| rendered directly in resources/views/app.blade.php so the first HTML
| response already carries a title, description, canonical and JSON-LD.
|
*/

return [
    'site' => [
        'name' => 'Prakarsa Studio',
        'url' => rtrim((string) env('APP_URL', 'https://prakarsastudio.com'), '/'),
        'logo' => '/images/prakarsa-logo.png',
        'og_image' => '/images/og-prakarsa.jpg',
        'locale' => 'id_ID',
        'email' => env('PUBLIC_EMAIL', 'hello@prakarsa.studio'),
        'city' => 'Jakarta',
        'country' => 'ID',
    ],

    'pages' => [
        'home' => [
            'title' => 'Prakarsa Studio — Jasa Pembuatan Website & Aplikasi Web Profesional',
            'description' => 'Prakarsa Studio adalah jasa pembuatan website company profile, landing page, dan aplikasi web untuk bisnis di Jakarta & seluruh Indonesia. Cepat, modern, dan siap mendatangkan hasil.',
            'robots' => 'index, follow',
        ],
        'about' => [
            'title' => 'Tentang Kami — Jasa Pembuatan Website Bisnis | Prakarsa Studio',
            'description' => 'Kenali Prakarsa Studio, partner pembuatan website bisnis Anda. Kami merancang company profile, landing page, hingga web application yang cepat, mudah ditemukan, dan siap bertumbuh.',
            'robots' => 'index, follow',
        ],
    ],
];
