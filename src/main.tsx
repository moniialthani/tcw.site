import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;
const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/';
const isArabic = pathname.startsWith('/ar');
const isServices = pathname.endsWith('/services') || (typeof window !== 'undefined' && window.location.hash === '#services');

const appElement = (
  <StrictMode>
    <App
      initialPage={isServices ? 'services' : 'home'}
      initialLang={isArabic ? 'ar' : 'en'}
    />
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, appElement);
} else {
  createRoot(rootElement).render(appElement);
}
