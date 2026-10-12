<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::get('/tentang', fn () => Inertia::render('Tentang'))->name('about');
Route::post('/kontak', [ContactController::class, 'store'])
    ->middleware('throttle:'.config('prakarsa.contact_throttle'))
    ->name('contact.store');
