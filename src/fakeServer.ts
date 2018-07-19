import 'reflect-metadata'; // this shim is required
import * as Koa from 'koa';
import { useKoaServer } from 'routing-controllers';
// import { API_TEST_PORT } from '../../config'

// const port =  API_TEST_PORT|| 3011;
const port = 3011;
const app = new Koa()
useKoaServer(app, {
  routePrefix: '',
  controllers: [__dirname + '/controllers/**/*.ts'],
});
export const server = app.listen(port)
export const testAdress = `http://localhost:${port}`
// export const testAdress = `http://localhost:3000`