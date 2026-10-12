<?php

return [
    // Alamat email studio yang menerima pesan dari formulir kontak. Kosong = pesan hanya disimpan di database.
    'contact_receiver' => env('CONTACT_RECEIVER'),

    // Alamat email yang ditampilkan di halaman. Belum dikonfirmasi pemilik, ganti lewat PUBLIC_EMAIL.
    'public_email' => env('PUBLIC_EMAIL', 'hello@prakarsa.studio'),

    // Nomor WhatsApp dengan kode negara, misalnya 62812xxxxxxx. Kosong = tautan WhatsApp tidak ditampilkan.
    'whatsapp' => env('WHATSAPP_NUMBER'),

    // URL profil sosial. Kosong = teks tampil tanpa tautan.
    'instagram' => env('INSTAGRAM_URL'),
    'linkedin' => env('LINKEDIN_URL'),

    // Pembatasan laju endpoint formulir kontak (format throttle Laravel: "max,minutes").
    'contact_throttle' => env('CONTACT_THROTTLE', '5,1'),
];
