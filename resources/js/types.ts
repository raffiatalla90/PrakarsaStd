import type { CSSProperties } from 'react';

export interface SharedProps {
    contact?: { email?: string; whatsapp?: string; instagram?: string | null; linkedin?: string | null };
    flash?: { contact_sent?: boolean };
    [key: string]: unknown;
}

/** CSS custom properties (--s, --i) are not in CSSProperties, so cast once here. */
export const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;
