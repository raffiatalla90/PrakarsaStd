import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import Splash from './Components/Splash';

document.documentElement.classList.add('js');

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
        return pages[`./Pages/${name}.tsx`] as never;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <Splash />
                <App {...props} />
            </>,
        );
    },
});
