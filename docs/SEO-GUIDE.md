# SEO & Google Search Console — panduan singkat

Situs sudah **siap diindeks** oleh mesin pencari. Yang tersisa hanya langkah
verifikasi di akun Google Anda (tidak bisa diotomatiskan karena Google memblokir
login dari browser otomatis).

## 1. Google Search Console (WAJIB — agar muncul di Google)

1. Buka https://search.google.com/search-console (login `prakarsastudio9@gmail.com`)
2. **Add property → Domain** → ketik `prakarsastudio.com` → Continue
3. Google memberi **TXT record**. Salin nilainya (bentuknya `google-site-verification=...`).
4. Buka **cPanel Rumahweb → Zone Editor / DNS Zone Editor** untuk `prakarsastudio.com`
5. **Add Record → TXT**:
   - Name/Host: `@` (atau `prakarsastudio.com`)
   - Record/Value: tempel nilai TXT dari Google
   - TTL: default
6. Kembali ke Search Console → **Verify** (bisa butuh beberapa menit propagasi DNS).
7. Setelah terverifikasi → menu **Sitemaps** → submit:
   `https://prakarsastudio.com/sitemap.xml`
8. **URL Inspection** → tempel `https://prakarsastudio.com/` → **Request Indexing**
   (ulangi untuk `/blog` dan tiap artikel).

### Alternatif: verifikasi lewat meta tag (lebih cepat, tanpa DNS)

Kalau tidak mau mengutak-atik DNS, pakai metode **HTML tag**:

1. Di Search Console pilih **URL prefix** → `https://prakarsastudio.com` → metode
   **HTML tag**. Google menampilkan:
   `<meta name="google-site-verification" content="ABC123..." />`
2. Salin **hanya nilai `content`** (contoh `ABC123...`).
3. Tambahkan ke `.env` server:
   ```
   GOOGLE_SITE_VERIFICATION=ABC123...
   ```
4. Jalankan deploy (`bash ~/prakarsa/deploy.sh`) — meta tag otomatis muncul di
   semua halaman, lalu klik **Verify** di Search Console.

> Kode `GOOGLE_SITE_VERIFICATION` sudah didukung situs ini. Cukup isi env-nya,
> tidak perlu ubah kode.

## 2. Yang sudah otomatis (tidak perlu Anda apa-apa)

| Fitur | Status |
|---|---|
| `sitemap.xml` (dinamis, memuat semua artikel) | ✅ live |
| `robots.txt` + Sitemap | ✅ live |
| Meta title/description/canonical server-rendered per halaman | ✅ |
| Open Graph + Twitter Card + OG image 1200×630 | ✅ |
| Structured data JSON-LD (ProfessionalService, WebSite, BlogPosting, BreadcrumbList) | ✅ |
| RSS feed `/blog/feed.xml` | ✅ |
| IndexNow (Bing, Yandex, Seznam, Naver) — submit otomatis tiap deploy | ✅ |
| Konten `noscript` (fallback crawler) | ✅ |

## 3. Menulis artikel baru

Cukup tambah file Markdown di `resources/content/blog/`, contoh
`resources/content/blog/06-judul-artikel.md`:

```markdown
---
title: Judul Artikel Anda
description: Ringkasan 150–160 karakter untuk Google.
keyword: kata kunci utama
date: 2026-03-01
tags: SEO, Tips Bisnis
---

Isi artikel dalam Markdown. Gunakan **bold**, daftar, dan heading `##`.
```

Commit & push → CI/CD otomatis build, deploy, dan submit URL baru ke IndexNow
(dalam ≤5 menit).

## 4. Mengharapkan hasil

- **Terindeks**: biasanya 2–7 hari setelah Search Console + Request Indexing.
- **Muncul di halaman 1 keyword kompetitif** ("jasa pembuatan website"): 2–8 minggu
  ke atas, dan butuh **backlink** (link dari situs lain) + konten rutin.
  Blog yang sudah ada adalah fondasi untuk itu — tambah 1–2 artikel/bulan.

## 5. Backlink (langkah tumbuh berikutnya)

- Daftar ke Google Business Profile (kalau ada alamat fisik).
- Cantumkan link di bio Instagram/LinkedIn/profil bisnis.
- Daftar di direktori bisnis Indonesia & lokal Jakarta.
- Guest post / kolaborasi dengan situs relevan.
