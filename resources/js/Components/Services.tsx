import type { ReactNode } from 'react';
import { Arrow, Label } from './Ui';

const ICON = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

const ITEMS: { no: string; title: string; text: string; icon: ReactNode }[] = [
    {
        no: '01',
        title: 'Website Development',
        text: 'Company profile, landing page, dan website bisnis responsif yang cepat, terukur, dan berkarakter.',
        icon: (
            <svg {...ICON}>
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18" />
            </svg>
        ),
    },
    {
        no: '02',
        title: 'Web Application Development',
        text: 'Aplikasi web, dashboard, dan sistem informasi yang efisien untuk mendukung pertumbuhan bisnis.',
        icon: (
            <svg {...ICON}>
                <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
                <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
                <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
                <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
            </svg>
        ),
    },
    {
        no: '03',
        title: 'UI/UX & Digital Product Design',
        text: 'Antarmuka intuitif, pengalaman pengguna yang matang, dan prototipe yang siap dikembangkan.',
        icon: (
            <svg {...ICON}>
                <path d="M4 20l1-4 11-11a2 2 0 0 1 3 3L8 19l-4 1Z" />
                <path d="M14 7l3 3" />
            </svg>
        ),
    },
    {
        no: '04',
        title: 'AI-Powered Solutions',
        text: 'Integrasi AI dan otomatisasi yang relevan untuk menyederhanakan proses dan membuka peluang baru.',
        icon: (
            <svg {...ICON}>
                <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" />
            </svg>
        ),
    },
];

export default function Services() {
    return (
        <section className="section sec-navy" id="layanan" aria-labelledby="layanan-h">
            <div className="wrap">
                <Label no="02">Layanan</Label>
                <div className="head-grid head-grid-end">
                    <h2 id="layanan-h" data-reveal>
                        Dari Ide Menjadi<br />
                        <em>Solusi Digital.</em>
                    </h2>
                    <p className="head-side" data-reveal>
                        Layanan end-to-end untuk membangun kehadiran dan produk digital yang relevan, fungsional, serta siap berkembang.
                    </p>
                </div>
                <ul className="svc-list">
                    {ITEMS.map((s) => (
                        <li key={s.no}>
                            <a className="svc-row" href="#kontak">
                                <span className="svc-no">{s.no}</span>
                                <span className="svc-ico">{s.icon}</span>
                                <span className="svc-title">{s.title}</span>
                                <span className="svc-text">{s.text}</span>
                                <span className="svc-go"><Arrow /></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
