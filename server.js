const PORT = 5000;
const fastify = require('fastify')({ logger: true });
fastify.register(require('@fastify/swagger'), {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'fastify-test',
    },
  },
  exposeRoute: true,
});

// register our routes plugin
fastify.register(require('./routes/items'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
