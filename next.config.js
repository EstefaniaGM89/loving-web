// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)', // aplica para todas las rutas
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://*.spotify.com https://*.google.com https://*.googletagmanager.com https://*.google-analytics.com;
              connect-src 'self' https://*.spotify.com https://*.google.com https://*.googletagmanager.com https://*.google-analytics.com https://*.ingest.sentry.io;
              img-src 'self' data: https://*.spotify.com https://*.google.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              frame-src https://accounts.spotify.com https://www.google.com;
            `.replace(/\n/g, ' ')
          }
        ]
      }
    ]
  }
}
// Configuración de Next.js para manejar CSP y otros headers