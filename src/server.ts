import 'reflect-metadata'; // this shim is required
import { useKoaServer } from 'routing-controllers';
import * as Koa from 'koa';

import * as mongoose from 'mongoose';

export let connection: mongoose.Connection;

export const startServer = async (port, dbUrl) => {
  const app: Koa = new Koa();
  connection = await mongoose.createConnection(dbUrl)
  useKoaServer(app, {
    routePrefix: '',
    controllers: [__dirname + '/controllers/**/*.ts']
  });

  return app.listen(port);
};
