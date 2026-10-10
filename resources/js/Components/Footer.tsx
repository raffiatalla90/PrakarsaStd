import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Logo } from './Ui';
import type { SharedProps } from '../types';

function jakartaTime() {
    return new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }).replace('.', ':');
}

function Social({ href, children }: { href?: string | null; children: string }) {
    return href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    ) : (
        <span>{children}</span>
    );
}

export default function Footer() {
    const { contact } = usePage<SharedProps>().props;
    const [time, setTime] = useState('');

    useEffect(() => {
        setTime(jakartaTime());
        const id = setInterval(() => setTime(jakartaTime()), 30000);
        return () => clearInterval(id);
    }, []);

    return (
        <footer className="site-footer">
            <div className="wrap">
                <div className="foot">
                    <div className="foot-brand">
                        <Logo />
                        <p className="foot-slogan">Initiating Tomorrow’s Website Solution.</p>
                        <p className="foot-desc">Studio teknologi digital independen untuk bisnis yang ingin bergerak ke depan.</p>
                    </div>
                    <nav className="foot-col" aria-label="Navigasi">
                        <h2 className="caps caps-flame">Navigasi</h2>
                        <a href="#beranda">Beranda</a>
                        <a href="#tentang">Tentang Kami</a>
                        <a href="#portofolio">Portofolio</a>
                        <a href="#kontak">Kontak</a>
                    </nav>
                    <nav className="foot-col" aria-label="Layanan">
                        <h2 className="caps caps-flame">Layanan</h2>
                        <a href="#layanan">Website Development</a>
                        <a href="#layanan">Web Application</a>
                        <a href="#layanan">UI/UX Design</a>
                        <a href="#layanan">AI Solutions</a>
                    </nav>
                    <div className="foot-col">
                        <h2 className="caps caps-flame">Terhubung</h2>
                        {contact?.email ? <a href={`mailto:${contact.email}`}>Email</a> : <span>Email</span>}
                        <Social href={contact?.instagram}>Instagram</Social>
                        <Social href={contact?.linkedin}>LinkedIn</Social>
                        {contact?.whatsapp ? (
                            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        ) : null}
                    </div>
                </div>
                <div className="foot-bar caps">
                    <p>© 2026 Prakarsa Studio. Hak cipta dilindungi.</p>
                    <p>Jakarta, Indonesia{time ? ` · ${time} WIB` : ''}</p>
                </div>
            </div>
        </footer>
    );
}
