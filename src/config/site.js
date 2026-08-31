export const COMPANY_NAME = 'RN Design';
export const COMPANY_LEGAL_NAME = 'RN Design & Serviços';
export const CREATOR_NAME = 'Rubens Neto';
export const WHATSAPP_NUMBER = '+55 (62) 99929-9020';
export const WHATSAPP_RAW_NUMBER = '5562999299020';
export const LAST_UPDATED = '8 de agosto de 2026';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const PROJECT_MESSAGE =
  'Olá! Vim do site da RN Design e quero conversar sobre um projeto.';
export const PRIVACY_MESSAGE =
  'Olá, tenho uma solicitação sobre privacidade e dados.';

export function createWhatsAppLink(message = PROJECT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_LINK = createWhatsAppLink(PRIVACY_MESSAGE);
export const PROJECT_WHATSAPP_LINK = createWhatsAppLink();

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/rubs_neto/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dev-rubens/' },
  { label: 'WhatsApp', href: PROJECT_WHATSAPP_LINK },
];

export const SITE_DESCRIPTION =
  'A RN Design une estratégia, design, desenvolvimento web e inteligência artificial para criar marcas, sites e produtos digitais claros, rápidos e preparados para crescer.';

export const SITE_KEYWORDS = [
  'RN Design',
  'design de interfaces',
  'desenvolvimento web',
  'branding',
  'marketing digital',
  'sistemas com inteligência artificial',
  'consultoria digital',
];

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: COMPANY_NAME,
  legalName: COMPANY_LEGAL_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/Logo_RN.png`,
  telephone: WHATSAPP_NUMBER,
  founder: {
    '@type': 'Person',
    name: CREATOR_NAME,
  },
  sameAs: SOCIAL_LINKS.filter(({ label }) => label !== 'WhatsApp').map(({ href }) => href),
  knowsAbout: SITE_KEYWORDS.slice(1),
};
