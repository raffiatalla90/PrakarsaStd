import { Label } from './Ui';

const POINTS = [
    'Solusi berorientasi bisnis',
    'Perpaduan desain & teknologi',
    'Sistem yang siap berkembang',
    'Pengalaman pengguna yang matang',
    'Integrasi AI yang relevan',
];

export default function Why() {
    return (
        <section className="section sec-glow" id="mengapa" aria-labelledby="mengapa-h">
            <div className="wrap">
                <Label no="05">Mengapa Prakarsa</Label>
                <h2 id="mengapa-h" className="h-xl" data-reveal>
                    Lebih dari Sekadar<br />
                    Membuat <em>Website.</em>
                </h2>
                <ul className="why-grid">
                    {POINTS.map((p, i) => (
                        <li key={p}>
                            <span className="why-no">{String(i + 1).padStart(2, '0')}</span>
                            <p>{p}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
