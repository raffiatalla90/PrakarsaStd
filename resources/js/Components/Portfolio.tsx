import { Arrow, Label, Mock } from './Ui';

function Icon({ d }: { d: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} />
        </svg>
    );
}

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
                        <div className="shot-combo umkm-combo">
                        <Mock className="mock-desk" url="lapakwarga.id">
                            <div className="desk">
                                <div className="desk-bar">
                                    <b>lapak<span>warga.id</span></b>
                                    <ul><li>UMKM</li><li>Kuliner</li><li>Toko</li><li>Jasa</li></ul>
                                    <span className="desk-cta">Daftarkan Usaha</span>
                                </div>
                                <div className="desk-hero">
                                    <p className="desk-eyebrow">DIREKTORI UMKM · SEKITARMU</p>
                                    <p className="desk-h">Temukan UMKM<br />yang Kamu Butuhkan</p>
                                    <div className="desk-search"><span>Cari produk, jasa, atau UMKM...</span><b>Search</b></div>
                                </div>
                                <div className="desk-grid">
                                    <div className="desk-card">
                                        <div className="desk-thumb"><b>UFI<br />BURGER</b></div>
                                        <span className="desk-tag">Kuliner</span>
                                        <p>UFI BURGER</p>
                                    </div>
                                    <div className="desk-card">
                                        <div className="desk-thumb desk-thumb-alt"><Icon d="M4 9h16l-1.4 10.2A2 2 0 0 1 16.6 21H7.4a2 2 0 0 1-2-1.8L4 9Zm4 0V6a4 4 0 0 1 8 0v3" /></div>
                                        <span className="desk-tag">Toko</span>
                                        <p>Warung Bu Sri</p>
                                    </div>
                                    <div className="desk-card">
                                        <div className="desk-thumb desk-thumb-alt"><Icon d="M14.5 3.5a4.2 4.2 0 0 0-5.6 5.4L3 14.8 6.2 18l5.9-5.9a4.2 4.2 0 0 0 5.4-5.6l-2.4 2.4-2.1-2.1 2.4-2.4Z" /></div>
                                        <span className="desk-tag">Jasa</span>
                                        <p>Servis AC Barokah</p>
                                    </div>
                                    <div className="desk-card">
                                        <div className="desk-thumb"><b>SATE<br />MADURA</b></div>
                                        <span className="desk-tag">Kuliner</span>
                                        <p>Sate Madura Cak</p>
                                    </div>
                                </div>
                            </div>
                        </Mock>
                        <div className="umkm" aria-hidden="true">
                            <span className="umkm-notch" />
                            <div className="umkm-screen">
                                <div className="umkm-hero">
                                    <b className="umkm-brand">lapakwarga.id</b>
                                    <Icon d="M8 2v4M12 2v4M4 6h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
                                    <span>Belum ada event aktif</span>
                                </div>
                                <div className="umkm-search">
                                    <span className="umkm-input">Cari produk, jasa, atau UMKM...</span>
                                    <span className="umkm-go">Search</span>
                                </div>
                                <ul className="umkm-cats">
                                    <li><span className="umkm-ico"><Icon d="M4 9h16l-1.4 10.2A2 2 0 0 1 16.6 21H7.4a2 2 0 0 1-2-1.8L4 9Zm4 0V6a4 4 0 0 1 8 0v3" /></span>UMKM</li>
                                    <li><span className="umkm-ico"><Icon d="M7 3v7a2 2 0 0 0 4 0V3M9 12v9M17 3c-1.6 1.2-2.4 2.8-2.4 4.8 0 1.4.8 2.4 2.4 2.7V21" /></span>Kuliner</li>
                                    <li><span className="umkm-ico"><Icon d="M5 8h14l-1.2 12H6.2L5 8Zm3.4 0V6.2a3.6 3.6 0 0 1 7.2 0V8" /></span>Toko</li>
                                    <li><span className="umkm-ico"><Icon d="M14.5 3.5a4.2 4.2 0 0 0-5.6 5.4L3 14.8 6.2 18l5.9-5.9a4.2 4.2 0 0 0 5.4-5.6l-2.4 2.4-2.1-2.1 2.4-2.4Z" /></span>Jasa</li>
                                </ul>
                                <p className="umkm-h">Temukan UMKM yang Kamu Butuhkan</p>
                                <p className="umkm-sub">Pilihan UMKM terbaik di sekitarmu</p>
                                <div className="umkm-grid">
                                    <div className="umkm-card">
                                        <span className="umkm-tag">UMKM Kuliner</span>
                                        <div className="umkm-thumb"><b>UFI<br />BURGER</b></div>
                                        <p>UFI BURGER</p>
                                    </div>
                                    <div className="umkm-card">
                                        <span className="umkm-tag">UMKM Toko</span>
                                        <div className="umkm-thumb umkm-thumb-alt"><Icon d="M4 9h16l-1.4 10.2A2 2 0 0 1 16.6 21H7.4a2 2 0 0 1-2-1.8L4 9Zm4 0V6a4 4 0 0 1 8 0v3" /></div>
                                        <p>Warung Bu Sri</p>
                                    </div>
                                    <div className="umkm-card">
                                        <span className="umkm-tag">UMKM Jasa</span>
                                        <div className="umkm-thumb umkm-thumb-alt"><Icon d="M14.5 3.5a4.2 4.2 0 0 0-5.6 5.4L3 14.8 6.2 18l5.9-5.9a4.2 4.2 0 0 0 5.4-5.6l-2.4 2.4-2.1-2.1 2.4-2.4Z" /></div>
                                        <p>Servis AC Barokah</p>
                                    </div>
                                    <div className="umkm-card">
                                        <span className="umkm-tag">UMKM Kuliner</span>
                                        <div className="umkm-thumb"><b>SATE<br />MADURA</b></div>
                                        <p>Sate Madura Cak</p>
                                    </div>
                                </div>
                                <ul className="umkm-nav">
                                    <li className="on"><Icon d="M3 10.5 12 3l9 7.5V21H3V10.5Z" /></li>
                                    <li><Icon d="M9 3 3 5.4v15.2L9 18l6 2.4 6-2.4V2.8L15 5.2 9 3Zm0 0v15M15 5.2v15.2" /></li>
                                    <li><Icon d="M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H7.4A3.4 3.4 0 0 0 4 18.4V20M10 11.6a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Zm10 8.4v-1.4a3.4 3.4 0 0 0-2.6-3.3M15.4 4.6a3.6 3.6 0 0 1 0 7" /></li>
                                    <li className="umkm-avatar" />
                                </ul>
                                <span className="umkm-url">lapakwarga.id</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="case-meta">
                        <div>
                            <p className="caps caps-flame">01 / Website UMKM — Direktori Lokal</p>
                            <h3>Direktori UMKM yang membuat usaha sekitar mudah ditemukan.</h3>
                        </div>
                        <div className="case-side">
                            <p>Pencarian, kategori usaha, dan halaman toko untuk kuliner, toko, dan jasa — satu tempat, ringan dibuka dari HP pembeli.</p>
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
