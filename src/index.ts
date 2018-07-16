import 'reflect-metadata'; // this shim is required

import './db';
import './MessageController'; // we need to "load" our controller before call createSocketServer. this is required
import './middleware';

import { useKoaServer, Action } from 'routing-controllers';

import * as Koa from 'koa';

const app = new Koa();

const port = process.env.PORT || 3000;

useKoaServer(app, {
  routePrefix: '',
  controllers: [__dirname + '/controllers/**/*.ts'],
});

app.listen(port);
