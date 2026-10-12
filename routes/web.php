<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::get('/tentang', fn () => Inertia::render('Tentang'))->name('about');
Route::post('/kontak', [ContactController::class, 'store'])
    ->middleware('throttle:'.config('prakarsa.contact_throttle'))
    ->name('contact.store');

Route::get('/sitemap.xml', function () {
    $siteUrl = rtrim((string) config('seo.site.url'), '/');

    $urls = [
        ['loc' => $siteUrl.'/', 'changefreq' => 'weekly', 'priority' => '1.0'],
        ['loc' => $siteUrl.'/tentang', 'changefreq' => 'monthly', 'priority' => '0.8'],
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
    foreach ($urls as $u) {
        $xml .= '    <url>'
            .'<loc>'.e($u['loc']).'</loc>'
            .'<changefreq>'.$u['changefreq'].'</changefreq>'
            .'<priority>'.$u['priority'].'</priority>'
            .'</url>'."\n";
    }
    $xml .= '</urlset>'."\n";

    return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
})->name('sitemap');
