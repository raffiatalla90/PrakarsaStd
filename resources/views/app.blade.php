<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @php
        $seo = config('seo');
        $site = $seo['site'];
        $siteUrl = rtrim($site['url'], '/');
        $routeName = request()->route()?->getName();
        $page = $seo['pages'][$routeName] ?? $seo['pages']['home'];
        $canonical = url()->current();
        $ogImage = $siteUrl.$site['og_image'];
        $logoUrl = $siteUrl.$site['logo'];
        $sameAs = array_values(array_filter([
            config('prakarsa.instagram'),
            config('prakarsa.linkedin'),
        ]));

        $org = [
            '@context' => 'https://schema.org',
            '@type' => 'ProfessionalService',
            'name' => $site['name'],
            'url' => $siteUrl,
            'logo' => $logoUrl,
            'image' => $ogImage,
            'description' => $page['description'],
            'email' => $site['email'],
            'address' => [
                '@type' => 'PostalAddress',
                'addressLocality' => $site['city'],
                'addressCountry' => $site['country'],
            ],
            'areaServed' => ['@type' => 'Country', 'name' => 'Indonesia'],
            'knowsAbout' => ['Pembuatan Website', 'Company Profile', 'Landing Page', 'Aplikasi Web', 'UI/UX Design', 'AI Solutions'],
        ];
        if ($sameAs) {
            $org['sameAs'] = $sameAs;
        }

        $website = [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => $site['name'],
            'url' => $siteUrl,
            'inLanguage' => 'id-ID',
        ];

        $breadcrumb = null;
        if ($routeName === 'about') {
            $breadcrumb = [
                '@context' => 'https://schema.org',
                '@type' => 'BreadcrumbList',
                'itemListElement' => [
                    ['@type' => 'ListItem', 'position' => 1, 'name' => 'Beranda', 'item' => $siteUrl.'/'],
                    ['@type' => 'ListItem', 'position' => 2, 'name' => 'Tentang Kami', 'item' => $canonical],
                ],
            ];
        }
    @endphp

    <title>{{ $page['title'] }}</title>
    <meta name="description" content="{{ $page['description'] }}">
    <meta name="robots" content="{{ $page['robots'] ?? 'index, follow' }}">
    <meta name="author" content="{{ $site['name'] }}">
    <link rel="canonical" href="{{ $canonical }}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ $site['name'] }}">
    <meta property="og:locale" content="{{ $site['locale'] }}">
    <meta property="og:title" content="{{ $page['title'] }}">
    <meta property="og:description" content="{{ $page['description'] }}">
    <meta property="og:url" content="{{ $canonical }}">
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="{{ $site['name'] }} — {{ $page['title'] }}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $page['title'] }}">
    <meta name="twitter:description" content="{{ $page['description'] }}">
    <meta name="twitter:image" content="{{ $ogImage }}">

    <meta name="theme-color" content="#0B0E13">
    <link rel="icon" type="image/png" href="/images/favicon.png">
    <link rel="apple-touch-icon" href="/images/favicon.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">

    <script type="application/ld+json">{!! json_encode($org, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    <script type="application/ld+json">{!! json_encode($website, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @if ($breadcrumb)
        <script type="application/ld+json">{!! json_encode($breadcrumb, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @endif

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body>
    <script>
        // Show the splash only on a first visit in this session, and never for
        // reduced-motion users. Runs pre-paint so there is no content flash.
        (function () {
            try {
                var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!reduce && sessionStorage.getItem('prakarsa-splash') !== '1') {
                    document.documentElement.classList.add('is-splashing');
                    // Safety net: if the JS bundle never boots, don't leave the page hidden.
                    window.setTimeout(function () {
                        document.documentElement.classList.remove('is-splashing');
                    }, 4000);
                }
            } catch (e) {}
        })();
    </script>
    <!--
    THESIS: a studio with no portfolio yet proves its craft through the page itself; the staircase (cover blocks, stepped P) is the one idea, and the hero refuses the centered-headline-plus-gradient-blob default.
    OWN-WORLD: anchorfish dark with a flame/truffle bloom behind three stepped site frames; palladian and oatmeal light sections; flame fills; DM Sans 800 headlines, Averia Serif body; 16px panels, 10px controls.
    STORY: visitor sees what Prakarsa builds (company profile, landing page, web app), believes the process is clear, starts a conversation.
    FIRST VIEWPORT: left headline "Initiating Tomorrow's Website Solution" at ~5.5rem with flame "Website", tagline, two buttons (primary flame "Diskusikan Website Anda"); right a diagonal staircase of three frames over the bloom.
    FORM: moodboard-pinned, user-selected direction (no roll); seed none; code-led.
    FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
    -->
    <noscript>
        <div style="max-width:48rem;margin:0 auto;padding:2.5rem 1.25rem;font-family:Georgia,serif;line-height:1.6">
            <h1>Prakarsa Studio — Jasa Pembuatan Website &amp; Aplikasi Web</h1>
            <p>Prakarsa Studio adalah jasa pembuatan website untuk bisnis Anda — company profile, landing page, hingga web application yang cepat, mudah ditemukan, dan siap mendatangkan hasil. Berbasis di Jakarta dan melayani seluruh Indonesia.</p>
            <h2>Layanan</h2>
            <ul>
                <li>Website Development — company profile, landing page, dan website bisnis responsif.</li>
                <li>Web Application Development — aplikasi web, dashboard, dan sistem informasi.</li>
                <li>UI/UX &amp; Digital Product Design — antarmuka intuitif dan prototipe siap dikembangkan.</li>
                <li>AI-Powered Solutions — integrasi AI dan otomatisasi untuk proses bisnis.</li>
            </ul>
            <h2>Kontak</h2>
            <p>Email: <a href="mailto:{{ $site['email'] }}">{{ $site['email'] }}</a> · <a href="/tentang">Tentang Kami</a></p>
        </div>
    </noscript>
    @inertia
</body>
</html>
