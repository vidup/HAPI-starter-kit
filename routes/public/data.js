import _ from 'lodash';
import Boom from 'boom';

import models from '../../models';

const routesPrefix = '/data';

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: false,
    },
    handler: (request, reply) => (async () => {
      try {
        const initialData = await models.Initial.getInitialData();
        reply(initialData);
      } catch (err) {
        reply(Boom.wrap(err));
      }
    })(),
  }
].map(route => ({
  ...route,
  path: `${routesPrefix}${route.path}`,
}));

export default routes;
