require('dotenv').config();

const Hapi = require('hapi');
const Good = require('good');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const Limiter = require('hapi-ratelimiter');
const HapiQs = require('hapi-qs');
const _ = require('lodash');
const slug = require('slug');
const numbro = require('numbro');
const culture = require('numbro/languages/fr-FR');
const moment = require('moment');

const routes = require('./routes').default;

slug.defaults.mode = 'rfc3986';
slug.charmap['’'] = ' ';

numbro.culture('fr-FR', culture);
numbro.culture('fr-FR');

moment.locale('fr-FR');


const server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true,
    },
  },
});

server.connection({
  port: process.env.DATA_API_PORT,
  routes: {
    cors: {
      credentials: true,
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'X-Auth-Token', 'X-Auth-As-Organization'],
    },
    validate: {
      options: {
        abortEarly: false,
      },
    },
  },
});

const plugins = [
  {
    register: Good,
    options: {
      ops: {
        interval: 1000,
      },
      reporters: {
        console: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*', error: '*', request: '*' }],
          },
          {
            module: 'good-console',
          },
          'stdout'],
      },
    },
  },
  {
    register: HapiAuthJwt2,
    options: {},
  },
  {
    register: HapiQs,
    options: {},
  },
  {
    register: Limiter,
    options: {},
  },
];

server.register(
  plugins,
  (err) => {
    if (err) {
      throw err;
    }

    server.route(routes);

    server.start((error) => {
      if (error) {
        throw error;
      }

      console.log('Server running at:', server.info.uri);
    });
  });
