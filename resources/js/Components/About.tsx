import { Arrow, Label } from './Ui';

export default function About() {
    return (
        <section className="section sec-cream" id="tentang" aria-labelledby="tentang-h">
            <div className="wrap">
                <Label no="01">Tentang Kami</Label>
                <div className="about-grid">
                    <h2 id="tentang-h" data-reveal>
                        Website yang Tepat.<br />
                        Dibangun untuk <em>Bertumbuh.</em>
                    </h2>
                    <div className="about-side" data-reveal>
                        <p className="about-lead">
                            Prakarsa Studio adalah partner pembuatan website untuk bisnis Anda — dari company profile, landing page, hingga web application, dirancang dan dibangun hingga siap mendatangkan hasil.
                        </p>
                        <p className="about-sub">
                            Setiap halaman kami susun dengan struktur yang rapi, performa yang ringan, dan alur yang jelas — supaya pengunjung betah, mudah menemukan informasi, dan lebih siap menghubungi Anda.
                        </p>
                        <a className="link-line" href="#portofolio">Lihat karya kami <Arrow /></a>
                    </div>
                </div>
            </div>
        </section>
    );
}
