import express, { NextFunction, Response, Request } from 'express';
import proxy from 'express-http-proxy';
import path from 'path';
import render from './utils/render';

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
app.get('*', (req, res, next) => {
  const html = render(req.url);

  return res.status(200).send(html);
});

//Errors
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log('*** An error occurred !!! ***');
  console.log(error);
});

app.listen(process.env.PORT || 5000);
