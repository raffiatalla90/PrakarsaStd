<?php

namespace App\Support;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

/**
 * File-based blog. Articles live as Markdown files with a tiny YAML-ish
 * front-matter block in resources/content/blog/*.md so the owner can add a
 * post by dropping in a text file — no database, no admin panel, and the
 * content is versioned with the code.
 *
 * Front-matter keys: title, description, date (YYYY-MM-DD), keyword, tags.
 */
class Blog
{
    public static function path(): string
    {
        return resource_path('content/blog');
    }

    /**
     * Every post, newest first, with rendered HTML. Cached per content version.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function all(): array
    {
        try {
            return Cache::rememberForever(static::cacheKey(), fn (): array => static::load());
        } catch (\Throwable) {
            // Never let a cache/driver problem take the site down.
            return static::load();
        }
    }

    /**
     * Read and parse every post from disk, newest first.
     *
     * @return array<int, array<string, mixed>>
     */
    protected static function load(): array
    {
        $files = glob(static::path().'/*.md') ?: [];
        $posts = [];

        foreach ($files as $file) {
            $post = static::parseFile($file);
            if ($post !== null) {
                $posts[] = $post;
            }
        }

        usort($posts, fn (array $a, array $b): int => strcmp((string) $b['date'], (string) $a['date']));

        return $posts;
    }

    /**
     * Lightweight list for index pages (no body / rendered HTML).
     *
     * @return array<int, array<string, mixed>>
     */
    public static function summaries(): array
    {
        return array_map(
            fn (array $post): array => Arr::except($post, ['body', 'contentHtml']),
            static::all()
        );
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function find(string $slug): ?array
    {
        foreach (static::all() as $post) {
            if ($post['slug'] === $slug) {
                return $post;
            }
        }

        return null;
    }

    /**
     * A few other posts to link to at the end of an article.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function related(string $slug, int $limit = 3): array
    {
        $out = [];

        foreach (static::summaries() as $post) {
            if ($post['slug'] === $slug) {
                continue;
            }
            $out[] = $post;
            if (count($out) >= $limit) {
                break;
            }
        }

        return $out;
    }

    public static function render(string $markdown): string
    {
        return (string) Str::markdown($markdown, [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
    }

    /**
     * Cache key changes whenever a content file changes, so a deploy that adds
     * or edits an article is picked up automatically.
     */
    protected static function cacheKey(): string
    {
        $files = glob(static::path().'/*.md') ?: [];
        $stamp = 0;
        foreach ($files as $file) {
            $stamp += (int) @filemtime($file);
        }

        return 'blog.posts.'.count($files).'.'.$stamp;
    }

    /**
     * @return array<string, mixed>|null
     */
    protected static function parseFile(string $file): ?array
    {
        $raw = @file_get_contents($file);
        if ($raw === false) {
            return null;
        }

        // "01-cara-memilih.md" -> "cara-memilih" (leading order prefix stripped)
        $slug = (string) preg_replace('/^\d+[-_]/', '', pathinfo($file, PATHINFO_FILENAME));

        $meta = [];
        $body = $raw;

        if (str_starts_with(ltrim($raw), '---')) {
            $parts = preg_split('/^---\s*$/m', $raw, 3);
            if (is_array($parts) && count($parts) >= 3) {
                $meta = static::parseFrontMatter((string) $parts[1]);
                $body = (string) $parts[2];
            }
        }

        $title = trim((string) ($meta['title'] ?? Str::headline($slug)));

        $date = trim((string) ($meta['date'] ?? ''));
        if (! preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            $date = date('Y-m-d', (int) (@filemtime($file) ?: time()));
        }

        $words = str_word_count(strip_tags($body));

        return [
            'slug' => $slug,
            'title' => $title,
            'description' => trim((string) ($meta['description'] ?? '')),
            'keyword' => trim((string) ($meta['keyword'] ?? '')),
            'date' => $date,
            'dateHuman' => static::humanDate($date),
            'tags' => array_values(array_filter(array_map('trim', explode(',', (string) ($meta['tags'] ?? ''))))),
            'readingTime' => max(1, (int) ceil($words / 200)),
            'body' => trim($body),
            'contentHtml' => static::render($body),
        ];
    }

    /**
     * @return array<string, string>
     */
    protected static function parseFrontMatter(string $block): array
    {
        $meta = [];

        foreach (preg_split('/\r\n|\r|\n/', trim($block)) ?: [] as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }
            $pos = strpos($line, ':');
            if ($pos === false) {
                continue;
            }
            $key = strtolower(trim(substr($line, 0, $pos)));
            $value = trim(substr($line, $pos + 1));
            $value = trim($value, "\"'");
            if ($key !== '') {
                $meta[$key] = $value;
            }
        }

        return $meta;
    }

    protected static function humanDate(string $date): string
    {
        $months = [
            1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
        ];

        $ts = strtotime($date) ?: time();

        return date('j', $ts).' '.$months[(int) date('n', $ts)].' '.date('Y', $ts);
    }
}
