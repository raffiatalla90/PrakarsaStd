import { usePage } from '@inertiajs/react';
import { Arrow, Label } from './Ui';
import type { SharedProps } from '../types';

function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24-1.52 0-3.01-.41-4.31-1.19l-.31-.18-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24Zm4.71 10.34c-.26-.13-1.53-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.08-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44-.15-.01-.32-.01-.49-.01-.17 0-.45.06-.68.32-.24.26-.9.88-.9 2.14 0 1.27.92 2.49 1.05 2.66.13.17 1.81 2.76 4.38 3.87.61.26 1.09.42 1.46.54.61.19 1.17.17 1.61.1.49-.07 1.53-.62 1.74-1.23.22-.6.22-1.12.15-1.23-.06-.11-.24-.17-.5-.3Z" />
        </svg>
    );
}

export default function Contact() {
    const { contact } = usePage<SharedProps>().props;

    const waHref = contact?.whatsapp
        ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Halo Prakarsa Studio, saya ingin berdiskusi tentang sebuah proyek digital.')}`
        : undefined;

    return (
        <section className="section sec-terra" id="kontak" aria-labelledby="kontak-h">
            <div className="wrap contact-grid">
                <div className="contact-copy">
                    <Label>Mulai Percakapan</Label>
                    <h2 id="kontak-h" data-reveal>
                        Mari Wujudkan Ide<br />
                        Menjadi <em>Solusi<br />Digital.</em>
                    </h2>
                    <p className="contact-lead">
                        Punya rencana website untuk bisnis Anda? Ceritakan saja tujuan dan kebutuhan yang ada, kami bantu petakan langkah berikutnya bersama Prakarsa Studio.
                    </p>
                    {contact?.email && (
                        <a className="link-line" href={`mailto:${contact.email}`}>
                            {contact.email} <Arrow />
                        </a>
                    )}
                </div>

                <div className="contact-card wa-card">
                    <span className="wa-badge">
                        <WhatsAppIcon />
                    </span>
                    <h3 className="wa-title">Obrolan Langsung via WhatsApp</h3>
                    <p className="wa-text">
                        Cara tercepat terhubung dengan kami. Kirim pesan dan tim Prakarsa Studio akan langsung membalas untuk membahas ide Anda.
                    </p>
                    <ul className="wa-points">
                        <li>Balasan cepat di hari kerja</li>
                        <li>Diskusi gratis tanpa komitmen</li>
                        <li>Langsung dengan tim, tanpa formulir</li>
                    </ul>
                    {waHref ? (
                        <a className="btn" href={waHref} target="_blank" rel="noopener noreferrer">
                            Chat via WhatsApp <Arrow />
                        </a>
                    ) : (
                        <p className="wa-unavailable">Nomor WhatsApp belum tersedia. Silakan hubungi kami lewat email.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
