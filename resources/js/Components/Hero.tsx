import { useEffect, useState } from 'react';
import { Arrow } from './Ui';

const WORDS = ['Kesan Pertama', 'Kepercayaan', 'Dampak Nyata', 'Masa Depan'];

function useTypewriter(words: string[], typeMs = 85, holdMs = 1500, eraseMs = 40) {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [phase, setPhase] = useState<'type' | 'hold' | 'erase'>('type');

    useEffect(() => {
        if (phase === 'type') {
            if (text === words[index]) {
                const t = setTimeout(() => setPhase('hold'), holdMs);
                return () => clearTimeout(t);
            }
            const t = setTimeout(() => setText(words[index].slice(0, text.length + 1)), typeMs);
            return () => clearTimeout(t);
        }
        if (phase === 'hold') {
            const t = setTimeout(() => setPhase('erase'), 240);
            return () => clearTimeout(t);
        }
        if (text === '') {
            setIndex((i) => (i + 1) % words.length);
            setPhase('type');
            return;
        }
        const t = setTimeout(() => setText(words[index].slice(0, text.length - 1)), eraseMs);
        return () => clearTimeout(t);
    }, [text, phase, index, words, typeMs, holdMs, eraseMs]);

    return text;
}

export default function Hero() {
    const typed = useTypewriter(WORDS);

    return (
        <section className="hero" id="beranda">
            <div className="hero-top">
                <div className="hero-copy hero-stagger">
                    <p className="hero-eyebrow">
                        <span className="hero-dot" aria-hidden="true" />
                        Studio digital · Jakarta · Est. 2026
                    </p>
                    <h1>
                        Bukan Sekadar Website.<br />
                        Sebuah <em className="type-wrap">
                            <span>{typed}</span>
                            <span className="type-caret" aria-hidden="true" />
                        </em>
                    </h1>
                    <p className="hero-lead">
                        Kami merancang dan membangun website yang cepat, interaktif, dan siap tumbuh bersama bisnis Anda — dari company profile hingga web application.
                    </p>
                    <div className="hero-actions">
                        <a className="btn" href="#kontak">Mulai Proyek <Arrow /></a>
                        <a className="btn-text" href="#portofolio">Lihat Karya Kami <Arrow /></a>
                    </div>
                </div>

                <div className="hero-visual" data-reveal>
                    <div className="glass-stack">
                        <div className="glass-panel glass-panel-main">
                            <span className="glass-glow" aria-hidden="true" />
                            <div className="glass-chrome" aria-hidden="true">
                                <span className="dots"><i /><i /><i /></span>
                                <span className="glass-url">prakarsa.studio</span>
                            </div>
                            <div className="glass-body">
                                <p className="glass-eyebrow">COMPANY PROFILE WEBSITES</p>
                                <p className="glass-title">Crafted to<br />command trust.</p>
                                <div className="glass-meta">
                                    <span>Prakarsa</span>
                                    <span>STUDIO / EST. 2026</span>
                                </div>
                            </div>
                        </div>
                        <div className="glass-chip glass-chip-a" aria-hidden="true">
                            <span className="chip-k">Company Profile</span>
                            <span className="chip-v">Desain & Build</span>
                        </div>
                        <div className="glass-chip glass-chip-b" aria-hidden="true">
                            <span className="chip-k">Pengembangan</span>
                            <span className="chip-v">Cepat & Terukur</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
