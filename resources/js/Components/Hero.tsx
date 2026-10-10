import { Arrow, Mock } from './Ui';

export default function Hero() {
    return (
        <section className="hero" id="beranda">
            <div className="hero-top">
                <div className="hero-copy">
                    <h1>
                        Bukan Sekadar<br />
                        Website. <em>Sebuah<br />Kesan Pertama.</em>
                    </h1>
                    <p className="hero-lead">
                        Setiap detail kami rancang dengan cermat untuk menghadirkan citra yang meyakinkan dan pengalaman yang berkesan — dari brand lokal hingga bisnis yang siap naik kelas.
                    </p>
                    <div className="hero-actions">
                        <a className="btn" href="#kontak">Mulai Proyek <Arrow /></a>
                        <a className="btn-text" href="#portofolio">Lihat Karya Kami <Arrow /></a>
                    </div>
                    <div className="hero-tag">
                        <span className="tag-seal" aria-hidden="true">
                            <span className="tag-seal-mark">P</span>
                        </span>
                        <div className="tag-body">
                            <p className="tag-kicker">Prakarsa Studio</p>
                            <p className="tag-slogan">Initiating tomorrow's website solution.</p>
                            <div className="tag-meta">
                                <span className="tag-pulse" aria-hidden="true" />
                                <span>Bespoke digital craft · Jakarta</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Mock className="mock-hero" data-reveal>
                    <div className="orbit">
                        <span className="orbit-brand">Prakarsa</span>
                        <span className="orbit-meta">STUDIO / EST. 2026</span>
                        <span className="orb" />
                        <p className="orbit-eyebrow">COMPANY PROFILE WEBSITES</p>
                        <p className="orbit-title">Crafted to<br />command trust.</p>
                    </div>
                </Mock>
            </div>
        </section>
    );
}
