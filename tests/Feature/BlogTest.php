<?php

namespace Tests\Feature;

use Tests\TestCase;

class BlogTest extends TestCase
{
    public function test_blog_index_loads(): void
    {
        $this->get('/blog')->assertStatus(200);
    }

    public function test_blog_article_loads_with_server_rendered_content(): void
    {
        $response = $this->get('/blog/cara-memilih-jasa-pembuatan-website');

        $response->assertStatus(200);
        // The article body must be present in the raw HTML (not only after JS).
        $response->assertSee('Memilih jasa pembuatan website bukan sekadar soal harga', false);
        $response->assertSee('BlogPosting', false);
    }

    public function test_unknown_article_returns_404(): void
    {
        $this->get('/blog/artikel-yang-tidak-ada')->assertStatus(404);
    }

    public function test_sitemap_lists_blog_posts(): void
    {
        $response = $this->get('/sitemap.xml');

        $response->assertStatus(200);
        $response->assertSee('/blog', false);
        $response->assertSee('cara-memilih-jasa-pembuatan-website', false);
    }

    public function test_home_links_to_blog_articles(): void
    {
        $this->get('/')->assertStatus(200)->assertSee('/blog/', false);
    }
}
