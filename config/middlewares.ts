export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      cookie: {
        secure: true,
        sameSite: 'lax',
      },
    },
  },
  'strapi::favicon',
  'strapi::public',
];
