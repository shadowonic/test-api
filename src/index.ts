import 'reflect-metadata'; // this shim is required

import './db';
import './MessageController'; // we need to "load" our controller before call createSocketServer. this is required
import './middleware';
import { useKoaServer} from 'routing-controllers';
import * as Koa from 'koa';

import {API_PORT} from './config'

const app = new Koa();

const port = API_PORT || 3000;

useKoaServer(app, {
  routePrefix: '',
  controllers: [__dirname + '/controllers/**/*.ts'],
});
app.listen(port);


