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
                        <Mock className="mock-forma" url="kopirempah.id">
                            <div className="forma">
                                <span className="forma-brand">KOPI REMPAH</span>
                                <span className="forma-nav">Produk Tentang Kontak</span>
                                <p className="forma-eyebrow">KOPI SANGRAI · BANDUNG</p>
                                <p className="forma-title">Dari kebun,<br />ke cangkir.</p>
                                <div className="forma-goods">
                                    <span><b>Arabika Gayo</b>Rp 85.000</span>
                                    <span><b>Robusta Temanggung</b>Rp 65.000</span>
                                    <span><b>House Blend</b>Rp 75.000</span>
                                </div>
                                <span className="forma-foot">Pesan via WhatsApp</span>
                            </div>
                        </Mock>
                    </div>
                    <div className="case-meta">
                        <div>
                            <p className="caps caps-flame">01 / Website UMKM — Toko Produk</p>
                            <h3>Toko online yang membuat produk lokal mudah dibeli.</h3>
                        </div>
                        <div className="case-side">
                            <p>Katalog produk, harga, dan tombol pesan langsung ke WhatsApp — dibuat ringan agar tetap cepat dibuka dari HP pembeli.</p>
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
                            <div className="shot-combo">
                                <Mock className="mock-shot" url="getmasjid.com">
                                    <picture>
                                        <source srcSet="/images/getmasjid.webp" type="image/webp" />
                                        <img
                                            className="shot"
                                            src="/images/getmasjid.png"
                                            width="1200"
                                            height="683"
                                            loading="lazy"
                                            decoding="async"
                                            alt="Tangkapan layar web aplikasi GetMasjid: jadwal sholat dan peta masjid terdekat."
                                        />
                                    </picture>
                                </Mock>
                                <div className="mock-phone" aria-hidden="true">
                                    <span className="phone-notch" />
                                    <div className="phone-screen">
                                        <picture>
                                            <source srcSet="/images/getmasjid-mobile.webp" type="image/webp" />
                                            <img
                                                className="phone-shot"
                                                src="/images/getmasjid-mobile.png"
                                                width="300"
                                                height="1339"
                                                loading="lazy"
                                                decoding="async"
                                                alt=""
                                            />
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="caps caps-flame">02 / Web Application (PWA)</p>
                        <h3>GetMasjid, pendamping ibadah harian jamaah.</h3>
                        <p className="case-desc">
                            Aplikasi web yang menampilkan jadwal sholat lengkap, waktu imsak, serta peta masjid terdekat lengkap dengan rute dan detailnya. Dipakai sebagai PWA, jadi bisa dibuka cepat dari layar utama HP tanpa memasang aplikasi tambahan.
                        </p>
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
