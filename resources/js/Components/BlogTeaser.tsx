import { Link } from '@inertiajs/react';
import { Arrow, Label } from './Ui';
import type { BlogPostSummary } from '../types';

export default function BlogTeaser({ posts }: { posts: BlogPostSummary[] }) {
    if (posts.length === 0) return null;

    return (
        <section className="section sec-cream" id="blog" aria-labelledby="blog-h">
            <div className="wrap">
                <Label no="06">Catatan</Label>
                <div className="head-grid head-grid-end">
                    <h2 id="blog-h" data-reveal>
                        Panduan &amp; Wawasan<br />
                        <em>Seputar Website.</em>
                    </h2>
                    <p className="head-side" data-reveal>
                        Artikel praktis tentang pembuatan website, SEO, dan strategi digital untuk membantu bisnis Anda tampil dan bertumbuh.
                    </p>
                </div>

                <div className="blog-teaser-grid">
                    {posts.map((p) => (
                        <Link className="blog-teaser" href={`/blog/${p.slug}`} key={p.slug} data-reveal>
                            <p className="post-meta caps">
                                <span className="post-date">{p.dateHuman}</span>
                                <span aria-hidden="true">·</span>
                                <span>{p.readingTime} menit baca</span>
                            </p>
                            <h3 className="post-title">{p.title}</h3>
                            <p className="post-desc">{p.description}</p>
                        </Link>
                    ))}
                </div>

                <div style={{ marginTop: '2.6rem' }}>
                    <Link className="link-line" href="/blog">
                        Lihat semua artikel <Arrow />
                    </Link>
                </div>
            </div>
        </section>
    );
}
