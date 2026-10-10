import type { ReactNode } from 'react';

export function Arrow() {
    return (
        <svg className="arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

export function Logo({ className = '' }: { className?: string }) {
    return (
        <span className={`logo ${className}`}>
            <img className="logo-img" src="/images/prakarsa-logo.png" width="1350" height="754" alt="Prakarsa Studio" decoding="async" />
        </span>
    );
}

export function Label({ no, children }: { no?: string; children: ReactNode }) {
    return (
        <p className="label">
            {no ? <span className="label-no">{no}</span> : <span className="label-no label-gap" aria-hidden="true" />}
            <span>{children}</span>
        </p>
    );
}

export function Mock({ url = 'prakarsa.studio', className = '', children, ...rest }: { url?: string; className?: string; children: ReactNode } & Record<string, unknown>) {
    return (
        <div className={`mock ${className}`} aria-hidden="true" {...rest}>
            <div className="mock-bar">
                <span className="dots"><i /><i /><i /></span>
                <span className="mock-url">{url}</span>
            </div>
            <div className="mock-screen">{children}</div>
        </div>
    );
}
