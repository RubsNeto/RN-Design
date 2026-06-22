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
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
