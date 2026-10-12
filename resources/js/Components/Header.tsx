import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Arrow } from './Ui';

const LINKS = [
    ['beranda', 'Beranda'],
    ['layanan', 'Layanan'],
    ['portofolio', 'Portofolio'],
    ['kontak', 'Kontak'],
] as const;

export default function Header({ active = 'beranda', isHome = true }: { active?: string; isHome?: boolean }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [current, setCurrent] = useState(active);
    const [pill, setPill] = useState<{ left: number; width: number; on: boolean }>({ left: 0, width: 0, on: false });
    const btn = useRef<HTMLButtonElement>(null);
    const navRef = useRef<HTMLElement>(null);

    const movePill = (el: HTMLElement | null) => {
        const nav = navRef.current;
        if (!nav || !el || el.classList.contains('nav-cta')) {
            setPill((p) => ({ ...p, on: false }));
            return;
        }
        const nr = nav.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        setPill({ left: er.left - nr.left, width: er.width, on: true });
    };

    // position pill under the active item on mount / resize
    useLayoutEffect(() => {
        const nav = navRef.current;
        if (!nav) return;
        const el = nav.querySelector<HTMLElement>(`a[aria-current="location"]`);
        movePill(el);
        const onResize = () => movePill(nav.querySelector<HTMLElement>(`a[aria-current="location"]`));
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [current, isHome]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                btn.current?.focus();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!isHome) return;
        const sections = LINKS.map(([id]) => document.getElementById(id)).filter((s): s is HTMLElement => s !== null);
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
            { rootMargin: '-40% 0px -55% 0px' },
        );
        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, [isHome]);

    const home = isHome ? '' : '/';

    return (
        <header className={'site-header' + (scrolled || open ? ' is-solid' : '')} id="atas">
            <div className="bar" onMouseLeave={() => movePill(navRef.current?.querySelector<HTMLElement>('a[aria-current="location"]') ?? null)}>
                <a className="brand" href={isHome ? '#beranda' : '/'} aria-label="Prakarsa Studio, ke atas halaman">
                    <img
                        className="brand-logo"
                        src="/images/prakarsa-logo-wordmark.png"
                        width="1000"
                        height="133"
                        alt="Prakarsa Studio"
                        decoding="async"
                    />
                </a>
                <nav
                    ref={navRef}
                    className={'nav' + (open ? ' open' : '')}
                    id="nav-utama"
                    aria-label="Utama"
                    onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}
                >
                    <span className={'nav-pill' + (pill.on ? ' on' : '')} style={{ left: pill.left, width: pill.width }} />
                    {LINKS.map(([id, label]) => (
                        <a
                            key={id}
                            href={`${home}#${id}`}
                            aria-current={current === id ? 'location' : undefined}
                            onMouseEnter={(e) => movePill(e.currentTarget)}
                        >
                            {label}
                        </a>
                    ))}
                    <a href="/tentang" aria-current={current === 'tentang' ? 'location' : undefined} onMouseEnter={(e) => movePill(e.currentTarget)}>
                        Tentang Kami
                    </a>
                    <a className="nav-cta" href={`${home}#kontak`}>
                        Mulai Proyek <Arrow />
                    </a>
                </nav>
                <button ref={btn} className="menu-btn" type="button" aria-expanded={open} aria-controls="nav-utama" onClick={() => setOpen((v) => !v)}>
                    Menu
                </button>
            </div>
        </header>
    );
}
