import { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Contact from '../../Components/Contact';
import { Arrow, Label } from '../../Components/Ui';
import type { BlogPostSummary } from '../../types';

export default function BlogIndex({ posts }: { posts: BlogPostSummary[] }) {
    useEffect(() => {
        const items = document.querySelectorAll('[data-reveal], .section, .page-hero, .page-cta');
        if (!('IntersectionObserver' in window)) {
            items.forEach((el) => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                }),
            { threshold: 0.12 },
        );
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <>
            <Head title="Blog — Tips Website & Strategi Digital | Prakarsa Studio">
                <meta
                    name="description"
                    head-key="description"
                    content="Kumpulan artikel dan panduan seputar pembuatan website, SEO, dan strategi digital untuk membantu bisnis Anda tampil dan bertumbuh secara online."
                />
            </Head>
            <a className="skip" href="#utama">Lewati ke konten</a>
            <Header active="blog" isHome={false} />
            <main id="utama">
                <section className="page-hero" aria-labelledby="blog-h">
                    <div className="wrap">
                        <nav className="crumb caps" aria-label="Breadcrumb">
                            <Link href="/">Beranda</Link>
                            <span aria-hidden="true">/</span>
                            <span aria-current="page">Blog</span>
                        </nav>
                        <div className="page-hero-grid">
                            <div>
                                <Label no="01">Blog</Label>
                                <h1 id="blog-h" data-reveal>
                                    Catatan &amp; Panduan<br />
                                    <em>Seputar Website.</em>
                                </h1>
                            </div>
                            <div className="page-hero-side" data-reveal>
                                <p className="page-hero-lead">
                                    Artikel praktis tentang pembuatan website, SEO, dan strategi digital — untuk membantu bisnis Anda tampil dan bertumbuh secara online.
                                </p>
                                <a className="btn" href="#kontak">Diskusikan Proyek <Arrow /></a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section sec-cream" aria-label="Daftar artikel">
                    <div className="wrap">
                        {posts.length === 0 ? (
                            <p className="blog-empty">Belum ada artikel. Silakan kembali lagi nanti.</p>
                        ) : (
                            <ul className="post-grid">
                                {posts.map((p, i) => (
                                    <li key={p.slug} data-reveal>
                                        <article className="post-card">
                                            <p className="post-meta caps">
                                                <span className="post-date">{p.dateHuman}</span>
                                                <span aria-hidden="true">·</span>
                                                <span>{p.readingTime} menit baca</span>
                                            </p>
                                            <h2 className="post-title">
                                                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                                            </h2>
                                            <p className="post-desc">{p.description}</p>
                                            <Link className="link-line" href={`/blog/${p.slug}`}>
                                                Baca artikel <Arrow />
                                            </Link>
                                        </article>
                                        <span className="post-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

                <section className="page-cta" aria-labelledby="cta-h">
                    <div className="wrap">
                        <h2 id="cta-h" data-reveal>
                            Siap Memulai<br />
                            <em>Proyek Anda?</em>
                        </h2>
                        <p className="page-cta-text" data-reveal>
                            Ceritakan kebutuhan bisnis Anda. Kami bantu wujudkan website yang tepat, dari diskusi pertama hingga rilis.
                        </p>
                        <a className="btn" href="#kontak">Mulai Proyek <Arrow /></a>
                    </div>
                </section>

                <Contact />
            </main>
            <Footer />
        </>
    );
}
