<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Support\Blog;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home', [
    'posts' => array_slice(Blog::summaries(), 0, 3),
]))->name('home');
Route::get('/tentang', fn () => Inertia::render('Tentang'))->name('about');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::post('/kontak', [ContactController::class, 'store'])
    ->middleware('throttle:'.config('prakarsa.contact_throttle'))
    ->name('contact.store');

Route::get('/sitemap.xml', function () {
    $siteUrl = rtrim((string) config('seo.site.url'), '/');
    $urls = [
        ['loc' => $siteUrl.'/', 'lastmod' => null, 'changefreq' => 'weekly', 'priority' => '1.0'],
        ['loc' => $siteUrl.'/tentang', 'lastmod' => null, 'changefreq' => 'monthly', 'priority' => '0.8'],
        ['loc' => $siteUrl.'/blog', 'lastmod' => null, 'changefreq' => 'weekly', 'priority' => '0.8'],
    ];

    foreach (Blog::summaries() as $post) {
        $urls[] = [
            'loc' => $siteUrl.'/blog/'.$post['slug'],
            'lastmod' => $post['date'] ?? null,
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ];
    }

    $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
    foreach ($urls as $u) {
        $xml .= '    <url>'
            .'<loc>'.e($u['loc']).'</loc>'
            .($u['lastmod'] ? '<lastmod>'.e($u['lastmod']).'</lastmod>' : '')
            .'<changefreq>'.$u['changefreq'].'</changefreq>'
            .'<priority>'.$u['priority'].'</priority>'
            .'</url>'."\n";
    }
    $xml .= '</urlset>'."\n";

    return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
})->name('sitemap');

/*
| IndexNow key file. Served through Laravel so it works even when the host's
| document root only mirrors selected static files (no public/ symlink).
*/
Route::get('/{key}.txt', function (string $key) {
    $configured = (string) config('seo.indexnow.key');

    abort_unless($configured !== '' && hash_equals($configured, $key), 404);

    return response($key."\n", 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
})->where('key', '[A-Za-z0-9\-]+');
