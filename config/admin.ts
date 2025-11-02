export default ({ env }) => ({
  url: env('ADMIN_URL', '/admin'),
  serveAdminPanel: true,
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      sessionCookieName: 'strapi_session',
      accessTokenCookieName: 'strapi_access_token',
      refreshTokenCookieName: 'strapi_refresh_token',
      secure: false, // Temporarily disable to allow Fly.io proxy
      sameSite: 'lax',
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
