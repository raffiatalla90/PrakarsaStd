import { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Contact from '../Components/Contact';
import { Arrow, Label } from '../Components/Ui';

const VALUES = [
    {
        no: '01',
        title: 'Desain yang Bermakna',
        text: 'Setiap keputusan visual punya alasan. Kami merancang tampilan yang bukan hanya indah, tapi membangun kepercayaan dan mengarahkan perhatian.',
    },
    {
        no: '02',
        title: 'Rekayasa yang Andal',
        text: 'Website cepat, aman, dan mudah dikembangkan. Ditulis dengan standar modern agar siap tumbuh bersama bisnis Anda.',
    },
    {
        no: '03',
        title: 'Fokus pada Hasil',
        text: 'Kami mengukur keberhasilan dari dampaknya bagi bisnis Anda — bukan sekadar seberapa rapi tampilannya.',
    },
];

const STATS = [
    { value: '2026', label: 'Studio didirikan' },
    { value: '100%', label: 'Dikerjakan tim sendiri' },
    { value: '2–4 pekan', label: 'Rata-rata waktu rilis' },
    { value: 'Jakarta', label: 'Berbasis & melayani nasional' },
];

const PROCESS = [
    { no: '01', title: 'Diskusi', text: 'Kami mendengar tujuan, target, dan tantangan bisnis Anda sebelum menyentuh desain.' },
    { no: '02', title: 'Desain', text: 'Konsep visual dan alur pengalaman dirancang untuk menyampaikan pesan dengan jelas.' },
    { no: '03', title: 'Bangun', text: 'Pengembangan cepat, responsif, dan terukur, dengan integrasi yang Anda butuhkan.' },
    { no: '04', title: 'Rilis & Damping', text: 'Kami meluncurkan, mengukur, dan terus mendampingi agar website benar-benar bekerja.' },
];

export default function Tentang() {
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
            <Head title="Tentang Kami — Prakarsa Studio">
                <meta name="description" content="Prakarsa Studio adalah partner pembuatan website untuk bisnis Anda — company profile, landing page, hingga web application yang cepat, mudah ditemukan, dan siap mendatangkan hasil." />
            </Head>
            <a className="skip" href="#utama">Lewati ke konten</a>
            <Header active="tentang" isHome={false} />
            <main id="utama">
                <section className="page-hero" aria-labelledby="tentang-h">
                    <div className="wrap">
                        <nav className="crumb caps" aria-label="Breadcrumb">
                            <Link href="/">Beranda</Link>
                            <span aria-hidden="true">/</span>
                            <span aria-current="page">Tentang Kami</span>
                        </nav>
                        <div className="page-hero-grid">
                            <div>
                                <Label no="01">Tentang Kami</Label>
                                <h1 id="tentang-h" data-reveal>
                                    Partner Pembuatan<br />
                                    <em>Website Bisnis Anda.</em>
                                </h1>
                            </div>
                            <div className="page-hero-side" data-reveal>
                                <p className="page-hero-lead">
                                    Prakarsa Studio merancang dan membangun website yang bekerja untuk bisnis Anda — dari company profile, landing page, hingga web application.
                                </p>
                                <a className="btn" href="#kontak">Mulai Proyek <Arrow /></a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section sec-cream" aria-labelledby="cerita-h">
                    <div className="wrap">
                        <Label no="02">Cerita Kami</Label>
                        <div className="about-grid">
                            <h2 id="cerita-h" data-reveal>
                                Website yang Bekerja,<br />
                                Bukan Sekadar <em>Tampil.</em>
                            </h2>
                            <div className="about-side" data-reveal>
                                <p className="about-lead">
                                    Prakarsa Studio adalah partner pembuatan website untuk bisnis Anda — dari company profile, landing page, hingga web application, dirancang dan dibangun hingga siap mendatangkan hasil.
                                </p>
                                <p className="about-sub">
                                    Kami tidak sekadar membuat tampilan yang menarik. Kami merancang website yang cepat, mudah ditemukan, dan benar-benar membantu bisnis Anda tumbuh. Setiap proyek dimulai dari pemahaman atas tujuan Anda, lalu diterjemahkan menjadi produk digital yang relevan dan siap berkembang.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section sec-navy" aria-labelledby="nilai-h">
                    <div className="wrap">
                        <Label no="03">Nilai Kami</Label>
                        <div className="head-grid head-grid-end">
                            <h2 id="nilai-h" data-reveal>
                                Prinsip yang Kami<br />
                                <em>Pegang.</em>
                            </h2>
                        </div>
                        <ul className="value-grid">
                            {VALUES.map((v) => (
                                <li key={v.no} data-reveal>
                                    <span className="value-no">{v.no}</span>
                                    <h3>{v.title}</h3>
                                    <p>{v.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="stat-band" aria-label="Prakarsa Studio dalam angka">
                    <div className="wrap stat-grid">
                        {STATS.map((s) => (
                            <div className="stat" key={s.label}>
                                <p className="stat-value">{s.value}</p>
                                <p className="stat-label">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="section sec-deep" aria-labelledby="proses-h">
                    <div className="wrap">
                        <Label no="04">Cara Kami Bekerja</Label>
                        <div className="head-grid head-grid-end">
                            <h2 id="proses-h" data-reveal>
                                Proses yang Jelas,<br />
                                Hasil yang <em>Nyata.</em>
                            </h2>
                            <p className="head-side" data-reveal>
                                Empat langkah sederhana dari ide hingga website yang siap bekerja untuk bisnis Anda.
                            </p>
                        </div>
                        <ol className="process-grid">
                            {PROCESS.map((p) => (
                                <li key={p.no} data-reveal>
                                    <span className="process-no">{p.no}</span>
                                    <h3>{p.title}</h3>
                                    <p>{p.text}</p>
                                </li>
                            ))}
                        </ol>
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
