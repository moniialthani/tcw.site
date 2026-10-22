import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import App from '../src/App';

interface PageDef {
  path: string;
  lang: 'en' | 'ar';
  page: 'home' | 'services' | 'work';
  title: string;
  description: string;
  canonicalUrl: string;
}

const pages: PageDef[] = [
  {
    path: 'index.html',
    lang: 'en',
    page: 'home',
    title: 'This Could Work | Brand Strategy Consultancy',
    description: 'A brand strategy consultancy in Doha, working with founders on positioning, messaging and identity.',
    canonicalUrl: 'https://thiscouldwork.co/',
  },
  {
    path: 'work/index.html',
    lang: 'en',
    page: 'work',
    title: 'Work | This Could Work, Brand Strategy Consultancy',
    description: 'Selected work from This Could Work, a brand strategy consultancy in Doha, including website, copy, brand assets and launch strategy.',
    canonicalUrl: 'https://thiscouldwork.co/work/',
  },
  {
    path: 'services/index.html',
    lang: 'en',
    page: 'services',
    title: 'Services | This Could Work, Brand Strategy Consultancy',
    description: 'Brand strategy services in Doha: Research, Positioning, Messaging, Naming, Identity Direction, Social Content, Launch Strategy and Customer Experience.',
    canonicalUrl: 'https://thiscouldwork.co/services/',
  },
  {
    path: 'ar/index.html',
    lang: 'ar',
    page: 'home',
    title: 'This Could Work | استشارات استراتيجية وتسويقية',
    description: 'استوديو استشاري لاستراتيجية الهوية في الدوحة، يعمل مع المؤسسين على تحديد الموقع، الصوت والرسالة، والهوية البصرية.',
    canonicalUrl: 'https://thiscouldwork.co/ar/',
  },
  {
    path: 'ar/work/index.html',
    lang: 'ar',
    page: 'work',
    title: 'الأعمال | This Could Work للاستشارات الاستراتيجية',
    description: 'أعمال مختارة من This Could Work، استشارات استراتيجية الهوية والتسويق في الدوحة، تشمل المواقع الإلكترونية، النصوص، أصول الهوية، وتخطيط الإطلاق.',
    canonicalUrl: 'https://thiscouldwork.co/ar/work/',
  },
  {
    path: 'ar/services/index.html',
    lang: 'ar',
    page: 'services',
    title: 'الخدمات | This Could Work للاستشارات الاستراتيجية',
    description: 'خدمات استراتيجية الهوية من الدوحة: البحث، موقعك في السوق، الصوت والرسالة، اختيار الأسماء، توجيه الهوية البصرية، المحتوى، وتخطيط الإطلاق.',
    canonicalUrl: 'https://thiscouldwork.co/ar/services/',
  },
];

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'This Could Work',
    'alternateName': 'T.C.W.',
    'url': 'https://thiscouldwork.co',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'This Could Work',
    'legalName': 'This Could Work W.L.L.',
    'url': 'https://thiscouldwork.co',
    'email': 'hi@thiscouldwork.co',
    'taxID': '251358',
    'identifier': {
      '@type': 'PropertyValue',
      'name': 'Commercial Registration',
      'value': '251358',
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Doha',
      'addressCountry': 'Qatar',
    },
    'sameAs': [
      'https://www.instagram.com/thiscouldwork.co',
    ],
  },
];

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  const distDir = path.resolve(__dirname, '../dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const rawTemplate = fs.readFileSync(templatePath, 'utf-8');

  for (const pageDef of pages) {
    console.log(`Prerendering ${pageDef.canonicalUrl} (${pageDef.path})...`);

    // Render the React tree to static HTML
    const appHtml = ReactDOMServer.renderToString(
      React.createElement(App, {
        initialPage: pageDef.page,
        initialLang: pageDef.lang,
      })
    );

    let html = rawTemplate;

    // Replace <html> lang and dir
    html = html.replace(/<html[^>]*>/, `<html lang="${pageDef.lang}" dir="${pageDef.lang === 'ar' ? 'rtl' : 'ltr'}" class="scroll-smooth${pageDef.lang === 'ar' ? ' lang-ar' : ''}">`);

    // Update <title>
    html = html.replace(/<title>.*?<\/title>/, `<title>${pageDef.title}</title>`);

    // Update description meta tag
    html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${pageDef.description}" />`);

    // Update canonical link
    html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${pageDef.canonicalUrl}" />`);

    // Update og:tags
    html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${pageDef.title}" />`);
    html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${pageDef.description}" />`);
    html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${pageDef.canonicalUrl}" />`);

    // Ensure og:image and twitter:image are present
    const ogImageTag = '<meta property="og:image" content="https://thiscouldwork.co/og-image.jpg" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />';
    if (html.includes('property="og:image"')) {
      html = html.replace(/<meta property="og:image" content=".*?"\s*\/?>/, '<meta property="og:image" content="https://thiscouldwork.co/og-image.jpg" />');
    } else {
      html = html.replace('</head>', `    ${ogImageTag}\n  </head>`);
    }

    // Update twitter:tags
    html = html.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/, `<meta name="twitter:title" content="${pageDef.title}" />`);
    html = html.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/, `<meta name="twitter:description" content="${pageDef.description}" />`);

    const twitterImageTag = '<meta name="twitter:image" content="https://thiscouldwork.co/og-image.jpg" />';
    if (html.includes('name="twitter:image"')) {
      html = html.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/, twitterImageTag);
    } else {
      html = html.replace('</head>', `    ${twitterImageTag}\n  </head>`);
    }

    // Replace structured data script with exact WebSite + Organization JSON-LD
    const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n    </script>`;
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonLdTag);

    // Inject rendered React HTML into #root
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Write file
    const targetFile = path.join(distDir, pageDef.path);
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(`Wrote ${targetFile}`);
  }

  // Update sitemap.xml in dist and public
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://thiscouldwork.co/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://thiscouldwork.co/" />
    <xhtml:link rel="alternate" hreflang="ar" href="https://thiscouldwork.co/ar/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://thiscouldwork.co/" />
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://thiscouldwork.co/work/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://thiscouldwork.co/work/" />
    <xhtml:link rel="alternate" hreflang="ar" href="https://thiscouldwork.co/ar/work/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://thiscouldwork.co/work/" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://thiscouldwork.co/services/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://thiscouldwork.co/services/" />
    <xhtml:link rel="alternate" hreflang="ar" href="https://thiscouldwork.co/ar/services/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://thiscouldwork.co/services/" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://thiscouldwork.co/ar/</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://thiscouldwork.co/ar/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://thiscouldwork.co/" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://thiscouldwork.co/ar/work/</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://thiscouldwork.co/ar/work/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://thiscouldwork.co/work/" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://thiscouldwork.co/ar/services/</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://thiscouldwork.co/ar/services/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://thiscouldwork.co/services/" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), sitemapXml, 'utf-8');
  console.log('Sitemap generated successfully.');
}

prerender().catch((err) => {
  console.error('Error prerendering:', err);
  process.exit(1);
});
