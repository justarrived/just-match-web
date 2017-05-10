import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import {AppServerModuleNgFactory} from '../dist/ngfactory/src/app/app.server.module.ngfactory'
import {enableProdMode} from '@angular/core'
import { ngExpressEngine } from './express-engine';
import { Request } from 'express';
import { Response } from 'express';

import * as express from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

const app = express();

// Parse cookies
app.use(cookieParser());

// Use Gzip compression
app.use(compression());

// Enable angular production mode
enableProdMode();

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', 'src')

app.use('/', express.static('dist', {index: false}));

app.get('*', (req: Request, res: Response) => {
  console.time(`GET: ${req.originalUrl}`);
  res.render('../dist/index', {
    req: req,
    res: res
  });
  console.timeEnd(`GET: ${req.originalUrl}`);
});

const port = process.env.PORT || 8080;
console.log('Listening on port:', port);
app.listen(port);
