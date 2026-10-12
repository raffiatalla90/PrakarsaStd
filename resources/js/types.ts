import type { CSSProperties } from 'react';

export interface SharedProps {
    contact?: { email?: string; whatsapp?: string; instagram?: string | null; linkedin?: string | null };
    flash?: { contact_sent?: boolean };
    [key: string]: unknown;
}

export interface BlogPostSummary {
    slug: string;
    title: string;
    description: string;
    keyword?: string;
    date: string;
    dateHuman: string;
    tags: string[];
    readingTime: number;
}

export interface BlogPost extends BlogPostSummary {
    body: string;
    contentHtml: string;
}

/** CSS custom properties (--s, --i) are not in CSSProperties, so cast once here. */
export const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;
