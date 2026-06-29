import './globals.css'
import Header from '../components/Header';

export const metadata = {
  title: 'RN Design - Design & Development',
  description: 'RN Design - Transformando ideias em experiências digitais excepcionais',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Abre as conexões cedo p/ a cena 3D (Spline) carregar bem mais rápido */}
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
