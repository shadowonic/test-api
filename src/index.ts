import 'reflect-metadata'; // this shim is required
import { createSocketServer } from 'socket-controllers';

import './db';
import './MessageController'; // we need to "load" our controller before call createSocketServer. this is required
import './middleware';

import { useContainer, useKoaServer } from 'routing-controllers';
import { useContainer as useContainerScoket, useSocketServer } from 'socket-controllers';
import { Container } from 'typedi';
import * as http2 from 'http2';
import * as Koa from 'koa';
import * as fs from 'fs';
import * as socketIO from 'socket.io';
import * as cors from 'kcors';
import { SSL_OP_SINGLE_DH_USE } from 'constants';

useContainer(Container);

const app = new Koa();

const server = http2.createServer();
const port = process.env.PORT ||  3000;

useKoaServer(app, {
  routePrefix: '',
  controllers: [__dirname + '/controllers/**/*.ts']
});



app.listen(port, () => console.log(`listening on port ${port}`));
// createSocketServer(3000);