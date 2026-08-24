import './globals.css';
import { siteConfig } from '../data/siteConfig';
import { profile } from '../data/profile';
import { socialLinks } from '../data/socialLinks';
import { Providers } from './providers';

export const metadata = {
  metadataBase: new URL(siteConfig.url || 'https://kunalgavit.dev'),
  title: siteConfig.siteTitle || `${profile.name} | ${profile.title}`,
  description: siteConfig.description || profile.description,
  keywords: [
    profile.name,
    `${profile.name} Portfolio`,
    'Engineering Student',
    'Full Stack Developer',
    'AI Developer',
    'IoT Builder',
    'ESP32',
    'React',
    'Next.js',
    'Node.js',
    'CircuitBotz',
    'MIT India Hackathon 2026',
    'Pune Developer'
  ],
  authors: [{ name: profile.name, url: siteConfig.url || 'https://kunalgavit.dev' }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    url: siteConfig.url || 'https://kunalgavit.dev',
    title: `${profile.name} | Developer Portfolio & Startup Showcase`,
    description: profile.tagline || profile.description,
    images: [
      {
        url: siteConfig.ogImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: `${profile.name} Developer Portfolio`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.title}`,
    description: profile.tagline || profile.description,
    images: [siteConfig.ogImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop']
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export const viewport = {
  themeColor: '#06b6d4',
  width: 'device-width',
  initialScale: 1
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title || profile.role,
  email: profile.email,
  url: siteConfig.url || 'https://kunalgavit.dev',
  sameAs: [
    socialLinks.github,
    socialLinks.linkedin,
    socialLinks.twitter,
    socialLinks.instagram
  ].filter(Boolean),
  knowsAbout: [
    'Full Stack Web Development',
    'Next.js',
    'Generative Artificial Intelligence',
    'Internet of Things (IoT)',
    'Embedded C++ & ESP32',
    'React',
    'Node.js',
    'JavaScript'
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'MIT Academy of Engineering (MITAOE), Pune'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
