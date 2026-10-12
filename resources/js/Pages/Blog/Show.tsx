import { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Contact from '../../Components/Contact';
import { Arrow } from '../../Components/Ui';
import type { BlogPost, BlogPostSummary } from '../../types';

export default function BlogShow({ post, related }: { post: BlogPost; related: BlogPostSummary[] }) {
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
            <Head title={`${post.title} | Prakarsa Studio`}>
                <meta name="description" head-key="description" content={post.description} />
            </Head>
            <a className="skip" href="#utama">Lewati ke konten</a>
            <Header active="blog" isHome={false} />
            <main id="utama">
                <article className="post-page">
                    <header className="post-head">
                        <div className="wrap">
                            <nav className="crumb caps" aria-label="Breadcrumb">
                                <Link href="/">Beranda</Link>
                                <span aria-hidden="true">/</span>
                                <Link href="/blog">Blog</Link>
                                <span aria-hidden="true">/</span>
                                <span aria-current="page">{post.title}</span>
                            </nav>
                            <p className="post-meta caps">
                                <span>{post.dateHuman}</span>
                                <span aria-hidden="true">·</span>
                                <span>{post.readingTime} menit baca</span>
                            </p>
                            <h1 data-reveal>{post.title}</h1>
                            {post.description ? <p className="post-lead" data-reveal>{post.description}</p> : null}
                            {post.tags.length > 0 ? (
                                <ul className="pills" aria-label="Tag">
                                    {post.tags.map((t) => (
                                        <li key={t}>{t}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </header>

                    <div className="wrap">
                        <div className="post-body prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                    </div>

                    <div className="wrap">
                        <div className="post-foot">
                            <Link className="link-line" href="/blog">
                                <Arrow /> Kembali ke semua artikel
                            </Link>
                        </div>
                    </div>
                </article>

                {related.length > 0 ? (
                    <section className="section sec-deep" aria-labelledby="rel-h">
                        <div className="wrap">
                            <h2 id="rel-h" className="rel-h" data-reveal>
                                Artikel <em>Lainnya.</em>
                            </h2>
                            <ul className="post-grid post-grid-3">
                                {related.map((p) => (
                                    <li key={p.slug} data-reveal>
                                        <article className="post-card">
                                            <p className="post-meta caps">
                                                <span>{p.dateHuman}</span>
                                            </p>
                                            <h3 className="post-title">
                                                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                                            </h3>
                                            <p className="post-desc">{p.description}</p>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ) : null}

                <section className="page-cta" aria-labelledby="cta-h">
                    <div className="wrap">
                        <h2 id="cta-h" data-reveal>
                            Butuh Website yang<br />
                            <em>Bekerja?</em>
                        </h2>
                        <p className="page-cta-text" data-reveal>
                            Prakarsa Studio membantu bisnis membangun website yang cepat, modern, dan siap ditemukan di Google.
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
