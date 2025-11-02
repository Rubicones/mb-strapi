export default {
  register(/* { strapi } */) {
    // registeration phase
  },

  bootstrap({ strapi }) {
    // Force Koa to trust proxy headers
    if (strapi.server && strapi.server.app) {
      strapi.server.app.proxy = true;
    }
  },
};
