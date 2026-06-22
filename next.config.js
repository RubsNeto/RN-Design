/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // O projeto está dentro do OneDrive, que sincroniza/trava o .next/cache
    // e causa erros ENOENT nos arquivos .pack.gz do webpack. Desligar o cache
    // de filesystem em dev resolve a instabilidade (compila um pouco mais devagar).
    if (dev) {
      config.cache = false;
    }
    return config;
  },
}

module.exports = nextConfig
