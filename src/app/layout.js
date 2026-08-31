import '@rn-design/system/tokens.css';
import '@rn-design/system/base.css';
import '@rn-design/system/components.css';
import './globals.css';
import Header from '../components/Header';
import {
  COMPANY_NAME,
  CREATOR_NAME,
  ORGANIZATION_JSON_LD,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_URL,
} from '../config/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RN Design — Design, Desenvolvimento e IA',
    template: '%s — RN Design',
  },
  description: SITE_DESCRIPTION,
  applicationName: COMPANY_NAME,
  authors: [{ name: CREATOR_NAME }],
  creator: CREATOR_NAME,
  publisher: COMPANY_NAME,
  category: 'Design e tecnologia',
  keywords: SITE_KEYWORDS,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: COMPANY_NAME,
    title: 'RN Design — Design, Desenvolvimento e IA',
    description: SITE_DESCRIPTION,
    images: [{ url: '/images/Logo_RN.png', alt: 'RN Design & Serviços' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RN Design — Design, Desenvolvimento e IA',
    description: SITE_DESCRIPTION,
    images: ['/images/Logo_RN.png'],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(sessionStorage.getItem('rn-intro-seen')==='true'){document.documentElement.dataset.rnIntro='seen'}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
