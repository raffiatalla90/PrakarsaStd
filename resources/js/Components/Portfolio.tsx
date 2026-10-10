import { Arrow, Label, Mock } from './Ui';

export default function Portfolio() {
    return (
        <section className="section sec-deep" id="portofolio" aria-labelledby="portofolio-h">
            <div className="wrap">
                <Label no="03">Portofolio Terpilih</Label>
                <div className="head-grid head-grid-end">
                    <h2 id="portofolio-h" data-reveal>
                        Karya Digital yang Dirancang<br />
                        untuk <em>Memberikan<br />Dampak.</em>
                    </h2>
                    <p className="head-side" data-reveal>
                        Eksplorasi pendekatan kami dalam memadukan strategi, desain, dan teknologi menjadi pengalaman digital yang utuh.
                    </p>
                </div>

                <article className="case case-wide" data-reveal>
                    <div className="stage stage-warm" data-reveal>
                        <Mock className="mock-forma">
                            <div className="forma">
                                <span className="forma-brand">FORMA</span>
                                <span className="forma-nav">Work Studio Contact</span>
                                <p className="forma-eyebrow">INDEPENDENT ARCHITECTURE</p>
                                <p className="forma-title">Spaces with<br />meaning.</p>
                                <span className="forma-foot">Selected projects</span>
                                <span className="forma-down">↓</span>
                            </div>
                        </Mock>
                    </div>
                    <div className="case-meta">
                        <div>
                            <p className="caps caps-flame">01 / Business Website</p>
                            <h3>Identitas digital yang membangun kepercayaan.</h3>
                        </div>
                        <div className="case-side">
                            <p>Website responsif dengan narasi visual kuat dan pengalaman pengguna yang terarah.</p>
                            <ul className="pills">
                                <li>Strategy</li>
                                <li>UI/UX</li>
                                <li>Development</li>
                            </ul>
                            <span className="link-line link-static">Lihat Detail Proyek <Arrow /></span>
                        </div>
                    </div>
                </article>

                <div className="case-pair">
                    <article className="case" data-reveal>
                        <div className="stage stage-blue" data-reveal>
                            <Mock className="mock-shot" url="getmasjid.com">
                                <img
                                    className="shot"
                                    src="/images/getmasjid.png"
                                    width="3022"
                                    height="1720"
                                    loading="lazy"
                                    decoding="async"
                                    alt="Tangkapan layar aplikasi GetMasjid: jadwal sholat dan peta masjid terdekat."
                                />
                            </Mock>
                        </div>
                        <p className="caps caps-flame">02 / Web Application (PWA)</p>
                        <h3>Sistem yang membuat pekerjaan lebih sederhana.</h3>
                        <a className="link-line link-block" href="https://getmasjid.com" target="_blank" rel="noopener noreferrer">Lihat Detail Proyek <Arrow /></a>
                    </article>

                    <article className="case case-offset" data-reveal>
                        <div className="stage stage-dark" data-reveal>
                            <Mock className="mock-ai">
                                <div className="ai">
                                    <span className="ai-glow" />
                                    <p className="ai-eyebrow">AI WORKSPACE</p>
                                    <p className="ai-title">Ide bergerak<br />lebih cepat.</p>
                                    <p className="ai-cta">Mulai percakapan →</p>
                                </div>
                            </Mock>
                        </div>
                        <p className="caps caps-flame">03 / AI-Powered Product</p>
                        <h3>Teknologi cerdas untuk peluang yang lebih besar.</h3>
                        <span className="link-line link-block link-static">Lihat Detail Proyek <Arrow /></span>
                    </article>
                </div>
            </div>
        </section>
    );
}
