import { useEffect, useState } from 'react';

/**
 * Brand splash shown once per browser session on first paint.
 * Covers the page, draws the Prakarsa wordmark + a progress rule,
 * then lifts away. Bypassed entirely for prefers-reduced-motion users
 * and for repeat visits within the same session.
 */
export default function Splash() {
    // Start hidden on the server / repeat visits; the inline script in
    // app.blade.php sets data-splash so we can render before paint.
    const [phase, setPhase] = useState<'idle' | 'in' | 'out' | 'done'>('idle');

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const seen = sessionStorage.getItem('prakarsa-splash') === '1';

        if (reduce || seen) {
            setPhase('done');
            return;
        }

        document.documentElement.classList.add('is-splashing');
        setPhase('in');

        const hold = window.setTimeout(() => setPhase('out'), 1900);
        const end = window.setTimeout(() => {
            setPhase('done');
            sessionStorage.setItem('prakarsa-splash', '1');
            document.documentElement.classList.remove('is-splashing');
        }, 2650);

        return () => {
            window.clearTimeout(hold);
            window.clearTimeout(end);
            document.documentElement.classList.remove('is-splashing');
        };
    }, []);

    if (phase === 'done') return null;

    return (
        <div className={`splash splash-${phase}`} aria-hidden="true">
            <div className="splash-inner">
                <div className="glass-stack splash-stack">
                    <div className="glass-panel glass-panel-main">
                        <span className="glass-glow" aria-hidden="true" />
                        <div className="glass-chrome">
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
                </div>
                <span className="splash-rule" />
            </div>
        </div>
    );
}
