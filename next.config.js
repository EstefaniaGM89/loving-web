/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // todas las rutas
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; " +
                   "script-src 'self' https://*.spotify.com https://*.google-analytics.com https://www.google.com/recaptcha/enterprise; " +
                   "connect-src 'self' https://*.spotify.com https://*.google-analytics.com https://www.google.com/recaptcha/enterprise; " +
                   "img-src 'self' data: https://*.spotify.com; " +
                   "style-src 'self' 'unsafe-inline'; " +
                   "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
