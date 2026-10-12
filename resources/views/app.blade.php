<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="Prakarsa Studio membuat website company profile dan aplikasi web, dengan integrasi AI untuk bisnis yang ingin melangkah lebih dulu.">
    <link rel="icon" type="image/png" href="/images/favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
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
    @inertia
</body>
</html>
