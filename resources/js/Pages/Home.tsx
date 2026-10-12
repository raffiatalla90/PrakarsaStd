import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import About from '../Components/About';
import Services from '../Components/Services';
import Portfolio from '../Components/Portfolio';
import Contact from '../Components/Contact';
import Footer from '../Components/Footer';

export default function Home() {
    useEffect(() => {
        const items = document.querySelectorAll('[data-reveal], .section, .page-hero, .page-cta');
        if (!('IntersectionObserver' in window)) {
            items.forEach((el) => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                }),
            { threshold: 0.12 },
        );
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <>
            <Head title="Prakarsa Studio — Jasa Pembuatan Website & Aplikasi Web Profesional">
                <meta name="description" head-key="description" content="Prakarsa Studio adalah jasa pembuatan website company profile, landing page, dan aplikasi web untuk bisnis di Jakarta & seluruh Indonesia. Cepat, modern, dan siap mendatangkan hasil." />
            </Head>
            <a className="skip" href="#utama">Lewati ke konten</a>
            <Header />
            <main id="utama">
                <Hero />
                <About />
                <Services />
                <Portfolio />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
