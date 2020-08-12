import express, { NextFunction, Response, Request } from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config';
import path from 'path';

import routes from '../client/routes/routes';
import { autoLogin } from '../client/store/actions/auth';
import render from './utils/render';
import createStore from './utils/createStore';

const app = express();

//Proxy
app.use('/api', proxy('http://localhost:8080'));

//Static
app.use(
  '/favicon.ico',
  express.static(path.resolve(__dirname, '..', '..', 'static', 'favicon.ico')),
);
app.use(
  '/static',
  express.static(path.resolve(__dirname, '..', '..', 'static')),
);
app.use('/client', express.static(path.resolve(__dirname, '..', 'client')));

//Render
app.get('*', async (req, res, next) => {
  const context = { notFound: false };
  const store = createStore(req);
  await (store.dispatch as any)(autoLogin());

  const loadPromises = matchRoutes(routes, req.path).map(({ route }) => {
    if (route.loadData) {
      return route.loadData(store);
    } else {
      return null;
    }
  });
  await Promise.allSettled(loadPromises);

  const html = render(req.url, store, context);
  return res.status(context.notFound ? 404 : 200).send(html);
});

//Errors
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log('*** An error occurred !!! ***');
  console.log(error);
});

app.listen(process.env.PORT || 5000);
