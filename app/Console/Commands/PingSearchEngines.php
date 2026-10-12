<?php

namespace App\Console\Commands;

use App\Support\Blog;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

/**
 * Notify search engines (IndexNow: Bing, Yandex, Seznam, Naver) about new or
 * updated URLs. Google does not use IndexNow, but this gets the site into the
 * other engines within minutes instead of weeks.
 *
 * Usage: php artisan seo:ping
 */
class PingSearchEngines extends Command
{
    protected $signature = 'seo:ping';

    protected $description = 'Submit site URLs to IndexNow (Bing/Yandex/etc.)';

    public function handle(): int
    {
        $key = trim((string) config('seo.indexnow.key'));

        if ($key === '') {
            $this->error('No IndexNow key configured (set INDEXNOW_KEY in .env).');

            return self::FAILURE;
        }

        $siteUrl = rtrim((string) config('seo.site.url'), '/');
        $urls = [$siteUrl.'/', $siteUrl.'/tentang', $siteUrl.'/blog'];

        foreach (Blog::summaries() as $post) {
            $urls[] = $siteUrl.'/blog/'.$post['slug'];
        }

        $payload = [
            'host' => parse_url($siteUrl, PHP_URL_HOST),
            'key' => $key,
            'keyLocation' => $siteUrl.'/'.$key.'.txt',
            'urlList' => array_values($urls),
        ];

        try {
            $response = Http::timeout(15)
                ->acceptJson()
                ->post('https://api.indexnow.org/indexnow', $payload);
        } catch (\Throwable $e) {
            $this->error('IndexNow request failed: '.$e->getMessage());

            return self::FAILURE;
        }

        $this->info('Submitted '.count($urls).' URLs — HTTP '.$response->status());

        // 200 = ok, 202 = accepted (key pending). Anything else is a problem.
        return in_array($response->status(), [200, 202], true) ? self::SUCCESS : self::FAILURE;
    }
}
