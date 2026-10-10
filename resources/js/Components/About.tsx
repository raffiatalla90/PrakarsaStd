import { Arrow, Label } from './Ui';

export default function About() {
    return (
        <section className="section sec-cream" id="tentang" aria-labelledby="tentang-h">
            <div className="wrap">
                <Label no="01">Tentang Kami</Label>
                <div className="about-grid">
                    <h2 id="tentang-h" data-reveal>
                        Teknologi dengan<br />Tujuan.<br />
                        <em>Desain dengan Arah.</em>
                    </h2>
                    <div className="about-side" data-reveal>
                        <p className="about-lead">
                            Prakarsa Studio memadukan kreativitas, desain, rekayasa perangkat lunak, dan teknologi modern untuk mengubah ide menjadi solusi digital yang relevan bagi bisnis.
                        </p>
                        <p className="about-sub">
                            Kami percaya setiap produk digital yang baik dimulai dari pemahaman mendalam, bukan sekadar tampilan, tetapi dampak nyata yang ingin diciptakan.
                        </p>
                        <a className="link-line" href="#portofolio">Lihat karya kami <Arrow /></a>
                    </div>
                </div>
            </div>
        </section>
    );
}
