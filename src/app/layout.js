import '@rn-design/system/tokens.css';
import '@rn-design/system/base.css';
import '@rn-design/system/components.css';
import './globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'RN Design — Design, Desenvolvimento e IA',
  description:
    'Sistemas, produtos digitais e experiências sob medida com design, engenharia de software e inteligência artificial.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
