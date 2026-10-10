import { useEffect, useRef, useState } from 'react';
import { Arrow, Logo } from './Ui';

const LINKS = [
    ['beranda', 'Beranda'],
    ['layanan', 'Layanan'],
    ['portofolio', 'Portofolio'],
    ['tentang', 'Tentang Kami'],
    ['kontak', 'Kontak'],
] as const;

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('beranda');
    const btn = useRef<HTMLButtonElement>(null);

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
        const sections = LINKS.map(([id]) => document.getElementById(id)).filter((s): s is HTMLElement => s !== null);
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-45% 0px -50% 0px' },
        );
        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);

    return (
        <header className={'site-header' + (scrolled || open ? ' is-solid' : '')} id="atas">
            <div className="bar">
                <a className="brand" href="#beranda" aria-label="Prakarsa Studio, ke atas halaman">
                    <Logo />
                </a>
                <nav className={'nav' + (open ? ' open' : '')} id="nav-utama" aria-label="Utama" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
                    {LINKS.map(([id, label]) => (
                        <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
                            {label}
                        </a>
                    ))}
                    <a className="nav-cta" href="#kontak">
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
