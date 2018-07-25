import 'reflect-metadata'; // this shim is required
import * as supertest from 'supertest';
import { fakeUser } from './fakeDb/fakeUser';
import { startServer } from '../server';
import { testDbUrl } from './fakeDb/db';
import { userRoute, authRoute } from './routeTests';

const user = fakeUser;
const admin = { ...user, firstName: 'shadow', email: 'someEmail@gmail.com' };
export let request;

beforeAll(async () => {
  const port = 3012;
  const url = await testDbUrl();
  const app = await startServer(port, url);
  request = supertest(app);
}, 600000);
afterAll(() => setTimeout(() => process.exit(), 1000));


describe('route users', async () => {
  userRoute(user, admin);
  authRoute(user, admin);
});


