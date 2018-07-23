import 'reflect-metadata'; // this shim is required
import * as supertest from 'supertest';
import { fakeUser } from './fakeDb/fakeUser';
import { startServer } from '../server';
import { testDbUrl } from './fakeDb/db';
import { useKoaServer, Action } from 'routing-controllers';
import { User} from '../models/connections'
import {authService} from '../sevices'
import* as mongoose from 'mongoose'

let user = fakeUser;
let userId;
let password = user.password;
let request;

beforeAll(async () => {
 
  let port = 3012;
  let url = await testDbUrl();
  // await mongoose.connect(url)
  const app = await startServer(port, url);
  request = supertest(app);
}, 600000);
afterAll(() => setTimeout(() => process.exit(), 1000));

describe('route users', async () => {
  test('test routes', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  test('post user', async () => {
    const response = await request.post('/users').send(user);
    expect(response.status).toBe(201)
  });
  test('post existing user', async () => {
    const response = await request.post('/users').send(user);
    expect(response.status).toBe(500);
  });
  test('post user with wrong email', async () => {
    user.email = 'NotEmail'
    const response = await request.post('/users').send(user)
    expect(response.status).toBe(400)
  })
  test('test routes', async () => {
    const response = await request.get('/users');
    userId = response.body[0]._id;
    expect(response.status).toBe(200);
  });
  test('get user by id', async () => {
    const response = await request.get(`/users/${userId}`);
    expect(response.status).toBe(200);
  });
  test('delete user', async () => {
    const response = await request.delete(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response).toBeDefined();
  });
});
