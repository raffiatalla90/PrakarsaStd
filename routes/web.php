<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::post('/kontak', [ContactController::class, 'store'])->middleware('throttle:5,1')->name('contact.store');
