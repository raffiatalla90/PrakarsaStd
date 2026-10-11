import { usePage } from '@inertiajs/react';
import type { SharedProps } from '../types';

function Social({ href, children }: { href?: string | null; children: string }) {
    return href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    ) : (
        <span>{children}</span>
    );
}

export default function Footer() {
    const { contact } = usePage<SharedProps>().props;

    return (
        <footer className="site-footer">
            <div className="wrap">
                <div className="foot-compact">
                    <div className="foot-lead">
                        <p className="foot-wordmark">Prakarsa<span>Studio</span></p>
                        <p className="foot-slogan">Initiating Tomorrow’s Website Solution.</p>
                    </div>
                    <nav className="foot-links" aria-label="Footer">
                        <a href="/">Beranda</a>
                        <a href="/tentang">Tentang Kami</a>
                        <a href="/#layanan">Layanan</a>
                        <a href="/#portofolio">Portofolio</a>
                        <a href="/#kontak">Kontak</a>
                    </nav>
                    <div className="foot-social" aria-label="Terhubung">
                        {contact?.email ? <a href={`mailto:${contact.email}`}>Email</a> : <span>Email</span>}
                        <Social href={contact?.instagram}>Instagram</Social>
                        <Social href={contact?.linkedin}>LinkedIn</Social>
                        {contact?.whatsapp ? (
                            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        ) : null}
                    </div>
                </div>
                <div className="foot-bar caps">
                    <p>© 2026 Prakarsa Studio</p>
                </div>
            </div>
        </footer>
    );
}
