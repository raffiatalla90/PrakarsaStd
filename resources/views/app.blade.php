<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @php
        use App\Support\Blog;

        $seo = config('seo');
        $site = $seo['site'];
        $siteUrl = rtrim($site['url'], '/');
        $routeName = request()->route()?->getName();
        $meta = $seo['pages'][$routeName] ?? $seo['pages']['home'];
        $canonical = url()->current();
        $ogImage = $siteUrl.$site['og_image'];
        $logoUrl = $siteUrl.$site['logo'];
        $ogType = 'website';

        // Blog article: resolve the post so title/description/canonical and the
        // article body are rendered server-side (crawlers see real content).
        $post = null;
        if ($routeName === 'blog.show') {
            $post = Blog::find((string) request()->route('slug'));
            if ($post) {
                $meta = [
                    'title' => $post['title'].' | '.$site['name'],
                    'description' => $post['description'] !== '' ? $post['description'] : $meta['description'],
                    'robots' => 'index, follow',
                ];
                $canonical = $siteUrl.'/blog/'.$post['slug'];
                $ogType = 'article';
            }
        }

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
            'description' => $seo['pages']['home']['description'],
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
        $crumbs = [];
        if ($routeName === 'about') {
            $crumbs = [
                ['name' => 'Beranda', 'item' => $siteUrl.'/'],
                ['name' => 'Tentang Kami', 'item' => $canonical],
            ];
        } elseif ($routeName === 'blog.index') {
            $crumbs = [
                ['name' => 'Beranda', 'item' => $siteUrl.'/'],
                ['name' => 'Blog', 'item' => $canonical],
            ];
        } elseif ($routeName === 'blog.show' && $post) {
            $crumbs = [
                ['name' => 'Beranda', 'item' => $siteUrl.'/'],
                ['name' => 'Blog', 'item' => $siteUrl.'/blog'],
                ['name' => $post['title'], 'item' => $canonical],
            ];
        }
        if ($crumbs) {
            $breadcrumb = [
                '@context' => 'https://schema.org',
                '@type' => 'BreadcrumbList',
                'itemListElement' => array_map(
                    fn (array $c, int $i): array => [
                        '@type' => 'ListItem',
                        'position' => $i + 1,
                        'name' => $c['name'],
                        'item' => $c['item'],
                    ],
                    $crumbs,
                    array_keys($crumbs)
                ),
            ];
        }

        $article = null;
        if ($routeName === 'blog.show' && $post) {
            $article = [
                '@context' => 'https://schema.org',
                '@type' => 'BlogPosting',
                'headline' => $post['title'],
                'description' => $post['description'],
                'datePublished' => $post['date'],
                'dateModified' => $post['date'],
                'inLanguage' => 'id-ID',
                'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => $canonical],
                'image' => $ogImage,
                'author' => ['@type' => 'Organization', 'name' => $site['name'], 'url' => $siteUrl],
                'publisher' => [
                    '@type' => 'Organization',
                    'name' => $site['name'],
                    'logo' => ['@type' => 'ImageObject', 'url' => $logoUrl],
                ],
            ];
        }
    @endphp

    <title data-inertia="">{{ $meta['title'] }}</title>
    <meta name="description" data-inertia="description" content="{{ $meta['description'] }}">
    <meta name="robots" content="{{ $meta['robots'] ?? 'index, follow' }}">
    <meta name="author" content="{{ $site['name'] }}">
    @if ($post && $post['keyword'] !== '')
        <meta name="keywords" content="{{ $post['keyword'] }}">
    @endif
    <link rel="canonical" href="{{ $canonical }}">

    <meta property="og:type" content="{{ $ogType }}">
    <meta property="og:site_name" content="{{ $site['name'] }}">
    <meta property="og:locale" content="{{ $site['locale'] }}">
    <meta property="og:title" content="{{ $meta['title'] }}">
    <meta property="og:description" content="{{ $meta['description'] }}">
    <meta property="og:url" content="{{ $canonical }}">
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="{{ $site['name'] }} — jasa pembuatan website & aplikasi web profesional.">
    @if ($post)
        <meta property="article:published_time" content="{{ $post['date'] }}">
        <meta property="article:section" content="Blog">
    @endif

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $meta['title'] }}">
    <meta name="twitter:description" content="{{ $meta['description'] }}">
    <meta name="twitter:image" content="{{ $ogImage }}">

    <meta name="theme-color" content="#0B0E13">
    @php $googleVerification = trim((string) ($seo['verification']['google'] ?? '')); @endphp
    @if ($googleVerification !== '')
        @php
            // Accept either the bare content value or a full <meta ...> tag.
            if (preg_match('/content=["\']([^"\']+)["\']/', $googleVerification, $m)) {
                $googleVerification = $m[1];
            }
        @endphp
        <meta name="google-site-verification" content="{{ $googleVerification }}">
    @endif
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
    @if ($article)
        <script type="application/ld+json">{!! json_encode($article, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
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
    {{--
        Crawler / no-JS fallback. The app is an Inertia SPA, so without JS the
        <div id="app"> stays empty. Search engines read this block, so it carries
        the real page content: brand intro, services, contact — and, on blog
        pages, the full article list or article body.
    --}}
    <noscript>
        <div style="max-width:48rem;margin:0 auto;padding:2.5rem 1.25rem;font-family:Georgia,serif;line-height:1.6">
            @if ($routeName === 'blog.show' && $post)
                <p><a href="/">Prakarsa Studio</a> · <a href="/blog">Blog</a></p>
                <h1>{{ $post['title'] }}</h1>
                <p><em>{{ $post['dateHuman'] }}</em></p>
                {!! $post['contentHtml'] !!}
                <h2>Butuh bantuan membuat website?</h2>
                <p>Email: <a href="mailto:{{ $site['email'] }}">{{ $site['email'] }}</a></p>
            @elseif ($routeName === 'blog.index')
                <p><a href="/">Prakarsa Studio</a></p>
                <h1>Blog — Tips Website &amp; Strategi Digital</h1>
                <p>Artikel dan panduan seputar pembuatan website, SEO, dan strategi digital untuk bisnis.</p>
                <ul>
                    @foreach (Blog::summaries() as $p)
                        <li>
                            <h2><a href="/blog/{{ $p['slug'] }}">{{ $p['title'] }}</a></h2>
                            <p>{{ $p['description'] }}</p>
                        </li>
                    @endforeach
                </ul>
            @else
                <h1>Prakarsa Studio — Jasa Pembuatan Website &amp; Aplikasi Web</h1>
                <p>Prakarsa Studio adalah jasa pembuatan website untuk bisnis Anda — company profile, landing page, hingga web application yang cepat, mudah ditemukan, dan siap mendatangkan hasil. Berbasis di Jakarta dan melayani seluruh Indonesia.</p>
                <h2>Layanan</h2>
                <ul>
                    <li>Website Development — company profile, landing page, dan website bisnis responsif.</li>
                    <li>Web Application Development — aplikasi web, dashboard, dan sistem informasi.</li>
                    <li>UI/UX &amp; Digital Product Design — antarmuka intuitif dan prototipe siap dikembangkan.</li>
                    <li>AI-Powered Solutions — integrasi AI dan otomatisasi untuk proses bisnis.</li>
                </ul>
                <h2>Blog</h2>
                <ul>
                    @foreach (Blog::summaries() as $p)
                        <li><a href="/blog/{{ $p['slug'] }}">{{ $p['title'] }}</a></li>
                    @endforeach
                </ul>
                <h2>Kontak</h2>
                <p>Email: <a href="mailto:{{ $site['email'] }}">{{ $site['email'] }}</a> · <a href="/tentang">Tentang Kami</a></p>
            @endif
        </div>
    </noscript>
    @inertia
</body>
</html>
