import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/ui/Providers';
import { MainLayout } from '@/components/Layout/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Léo Ségalini | Développeur Full Stack React, TypeScript, Node.js',
  description: 'Portfolio de Léo Ségalini, développeur Full Stack spécialisé en React, TypeScript, et Node.js. Création d\'applications web modernes et performantes. Basé à La Réunion.',
  keywords: [
    'développeur web freelance', 'développeur full stack', 'développeur front-end', 'développeur back-end', 
    'développeur React', 'expert Next.js', 'développeur TypeScript', 'expert JavaScript', 'développement Node.js', 
    'API REST', 'création de site internet', 'création site vitrine', 'création site e-commerce', 'développement d applications web', 
    'développeur web La Réunion', 'freelance en développement web', 'développement SaaS', 'optimisation SEO', 
    'référencement naturel', 'audit SEO', 'performance web', 'optimisation de site web', 'intégration Supabase', 
    'intégration Xano', 'base de données Supabase', 'développement sur-mesure', 'développeur WordPress', 'expert Elementor', 
    'création site WordPress', 'développement Webflow', 'intégration API', 'développement mobile', 'PWA', 
    'applications web progressives', 'UX/UI design', 'conception d interface', 'optimisation UX', 'Figma to code', 
    'développement d API', 'backend serverless', 'Firebase', 'développeur cloud', 'hébergement web', 'gestion de projet web', 
    'consultant web', 'audit technique', 'refonte de site internet', 'développeur e-commerce', 'Shopify', 'WooCommerce', 
    'optimisation vitesse site', 'Google Core Web Vitals', 'développeur JAMstack', 'Vercel', 'Netlify', 'déploiement CI/CD', 
    'Docker', 'Kubernetes', 'microservices', 'développement full stack MERN', 'développeur JavaScript freelance', 'développeur web expert', 
    'agence web La Réunion', 'freelance Next.js', 'site internet professionnel', 'développement de marketplace', 'no-code', 
    'low-code', 'Bubble.io', 'SEO technique', 'mots-clés référencement', 'balises meta SEO', 'optimisation Core Web Vitals', 
    'hébergement rapide', 'Google Lighthouse', 'développement d applications SaaS', 'gestion de base de données', 'cloud computing', 
    'développeur Tailwind CSS', 'expert SCSS', 'intégration Stripe', 'paiement en ligne', 'authentification sécurisée', 
    'OAuth', 'JWT', 'Firebase Auth', 'gestion utilisateurs', 'React Native', 'Electron.js', 'développeur multiplateforme', 
    'éco-conception web', 'accessibilité web', 'RGPD', 'protection des données', 'sécurité web', 'cybersécurité', 'audit web'
  ],
  authors: [{ name: 'Léo Ségalini' }],
  creator: 'Léo Ségalini',
  publisher: 'Léo Ségalini',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://leosegalini.dev'
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://leosegalini.dev',
    title: 'Léo Ségalini | Développeur Full Stack React, TypeScript, Node.js',
    description: 'Portfolio de Léo Ségalini, développeur Full Stack spécialisé en React, TypeScript, et Node.js. Création d\'applications web modernes et performantes. Basé à La Réunion.',
    siteName: 'Portfolio Léo Ségalini',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Léo Ségalini - Développeur Full Stack'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Léo Ségalini | Développeur Full Stack React, TypeScript, Node.js',
    description: 'Portfolio de Léo Ségalini, développeur Full Stack spécialisé en React, TypeScript, et Node.js. Création d\'applications web modernes et performantes. Basé à La Réunion.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/logo_white.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo_black.png',
        media: '(prefers-color-scheme: light)',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-background-light dark:bg-background-dark 
                       text-text-light dark:text-text-dark transition-colors duration-300`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
