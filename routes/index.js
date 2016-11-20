import _ from 'lodash';

// import adminRoutes from './admin';
// import adminOrganismeRoutes from './admin-organisme';
import publicRoutes from './public';

const routes = [
  // ...adminRoutes,
  // ...adminOrganismeRoutes,
  ...publicRoutes,
].map(route => ({
  ...route,
  path: `/v1${_.trimEnd(route.path, '/')}`,
}));

export default routes;
