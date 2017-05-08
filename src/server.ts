import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import {AppServerModuleNgFactory} from '../dist/ngfactory/src/app/app.server.module.ngfactory'
import {enableProdMode} from '@angular/core'
import {getInlineCode} from 'preboot';
import {join} from 'path';
import {readFileSync} from 'fs';
import {renderModuleFactory} from '@angular/platform-server'
import * as express from 'express';
import * as compression from 'compression';

const app = express();

// Enable angular production mode
enableProdMode();

// Coordinate universal state transfer with perboot
const prebootOptions = {appRoot: 'body'};
const prebootInline = getInlineCode(prebootOptions);

// Inject preboot code into index head
let template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();
template = template.replace('</head>', `<script>${prebootInline}</script></head>'`);

// Use a custom html engine that renders index with preboot
app.engine('html', (_, options, callback) => {
  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => callback(null, html));
});
app.set('view engine', 'html');
app.set('views', 'src')

app.get('*.*', express.static(join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

const port = process.env.PORT || 8080;
console.log('Listening on port:', port);
app.listen(port);
