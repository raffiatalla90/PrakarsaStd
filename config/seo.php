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

    /*
    | Google Search Console verification. Paste the "HTML tag" content value
    | (or the whole <meta> tag) into GOOGLE_SITE_VERIFICATION in .env and the
    | meta tag is rendered site-wide automatically.
    */
    'verification' => [
        'google' => env('GOOGLE_SITE_VERIFICATION'),
    ],

    /*
    | IndexNow (Bing, Yandex, Seznam, Naver). The key file lives at
    | public/<key>.txt and must contain exactly the key. Run `php artisan
    | seo:ping` after publishing new content to submit URLs instantly.
    */
    'indexnow' => [
        'key' => env('INDEXNOW_KEY', '284953b3d1df49429bfc0969d2075080'),
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
        'blog.index' => [
            'title' => 'Blog — Tips Website & Strategi Digital | Prakarsa Studio',
            'description' => 'Kumpulan artikel dan panduan seputar pembuatan website, SEO, dan strategi digital untuk membantu bisnis Anda tampil dan bertumbuh secara online.',
            'robots' => 'index, follow',
        ],
        'blog.show' => [
            'title' => 'Artikel | Prakarsa Studio',
            'description' => 'Artikel Prakarsa Studio seputar pembuatan website, SEO, dan strategi digital untuk bisnis.',
            'robots' => 'index, follow',
        ],
    ],
];
