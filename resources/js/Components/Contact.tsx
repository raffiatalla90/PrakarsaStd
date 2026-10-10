import type { FormEvent, ReactNode } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Arrow, Label } from './Ui';
import type { SharedProps } from '../types';

type Key = 'name' | 'email' | 'business' | 'service' | 'message';

const SERVICES = ['Website Development', 'Web Application', 'UI/UX Design', 'AI Solutions'];

function Field({ id, label, error, wide, children }: { id: Key; label: string; error?: string; wide?: boolean; children: ReactNode }) {
    return (
        <div className={'field' + (wide ? ' field-wide' : '')}>
            <label htmlFor={id}>{label}</label>
            {children}
            {error && <p className="err" id={`err-${id}`}>{error}</p>}
        </div>
    );
}

export default function Contact() {
    const { flash, contact } = usePage<SharedProps>().props;
    const form = useForm({ name: '', email: '', business: '', service: '', message: '' });
    const { data, setData, errors, processing } = form;

    const bind = (key: Key) => ({
        id: key,
        name: key,
        value: data[key],
        onChange: (e: { target: { value: string } }) => setData(key, e.target.value),
        'aria-invalid': Boolean(errors[key]),
        'aria-describedby': errors[key] ? `err-${key}` : undefined,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post('/kontak', { preserveScroll: true, onSuccess: () => form.reset() });
    };

    const failed = Object.keys(errors).length > 0;

    return (
        <section className="section sec-terra" id="kontak" aria-labelledby="kontak-h">
            <div className="wrap contact-grid">
                <div className="contact-copy">
                    <Label>Mulai Percakapan</Label>
                    <h2 id="kontak-h" data-reveal>
                        Mari Wujudkan Ide<br />
                        Menjadi <em>Solusi<br />Digital.</em>
                    </h2>
                    <p className="contact-lead">Ceritakan kebutuhan bisnis Anda dan mari diskusikan solusi digital yang tepat.</p>
                    {contact?.email && (
                        <a className="link-line" href={`mailto:${contact.email}`}>
                            {contact.email} <Arrow />
                        </a>
                    )}
                </div>

                <form className="form" onSubmit={submit} noValidate>
                    <Field id="name" label="Nama Anda" error={errors.name}>
                        <input {...bind('name')} type="text" autoComplete="name" placeholder="Nama lengkap" required />
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
                        <input {...bind('email')} type="email" autoComplete="email" placeholder="nama@bisnis.com" required />
                    </Field>
                    <Field id="business" label="Nama Bisnis" error={errors.business}>
                        <input {...bind('business')} type="text" autoComplete="organization" placeholder="Perusahaan / brand" />
                    </Field>
                    <Field id="service" label="Jenis Layanan" error={errors.service}>
                        <select {...bind('service')}>
                            <option value="">Pilih layanan</option>
                            {SERVICES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </Field>
                    <Field id="message" label="Deskripsi Proyek" error={errors.message} wide>
                        <textarea {...bind('message')} rows={3} placeholder="Ceritakan singkat ide dan kebutuhan Anda..." required />
                    </Field>
                    <div className="form-foot">
                        <button className="btn" type="submit" disabled={processing}>
                            {processing ? 'Mengirim...' : <>Diskusikan Proyek Anda <Arrow /></>}
                        </button>
                        <div role="status" aria-live="polite">
                            {flash?.contact_sent && !failed && <p className="status">Pesan Anda sudah kami terima. Kami akan membalas lewat email.</p>}
                            {failed && <p className="status">Pesan belum terkirim. Periksa kolom yang ditandai.</p>}
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
