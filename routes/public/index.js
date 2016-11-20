import _ from 'lodash';
import dataRoutes from './data';


const routes = [
  ...dataRoutes,
].map(route => ({
  ...route,
  path: `/public${_.trimEnd(route.path, '/')}`,
}));

export default routes;
