import 'reflect-metadata'; // this shim is required
import { useKoaServer } from 'routing-controllers';
import * as Koa from 'koa';

import * as mongoose from 'mongoose';
import { AuthorizationChecker } from './middlware/AuthorizationChecker';


export const startServer = async (port, dbUrl) => {
  await mongoose.connect(dbUrl)
  const app: Koa = new Koa();
  useKoaServer(app, {
    routePrefix: '',
    controllers: [__dirname + '/controllers/**/*.ts'],
    authorizationChecker: AuthorizationChecker
  });

  return app.listen(port);
};
