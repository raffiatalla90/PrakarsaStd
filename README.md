<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Prakarsa Studio

Company profile site for Prakarsa Studio — a web development studio that fuses
development with AI. Built with **Laravel + React 19 via Inertia**, styled with
plain CSS in `resources/css/app.css`.

Content is in Indonesian; slogans stay English. The contact section routes
visitors to a conversation (WhatsApp/email), and `POST /kontak` still persists
submissions to `contact_messages` with optional email via `CONTACT_RECEIVER`.

## Local development

```bash
composer install
npm install
npm run dev            # Vite dev server
php artisan serve      # http://127.0.0.1:8000
```

Build for production:

```bash
npm run build
```

## End-to-end tests (Playwright)

UI and functional tests live in `tests/e2e`. They run against a local server,
across a desktop and a mobile project.

```bash
npx playwright install chromium   # first time only
npm run test:e2e                  # run the full suite
npm run test:e2e:ui               # interactive UI mode
npm run test:e2e:report           # open the last HTML report
```

By default the config boots its own server on `:8000` and raises the contact
rate limit (`CONTACT_THROTTLE`) so the suite can exercise the endpoint. To
target an already-running server, set `E2E_SKIP_SERVER=1` (and `E2E_BASE_URL`
if it is not on `127.0.0.1:8000`).

## Project layout

| Path | Purpose |
| --- | --- |
| `resources/js/Pages` | Inertia pages (`Home`, `Tentang`) |
| `resources/js/Components` | UI sections (Hero, Services, Portfolio, …) |
| `public/images` | Shipping raster assets |
| `tests/e2e` | Playwright UI + functional tests |
| `assets/source` | Raw working assets (gitignored) |

---

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
