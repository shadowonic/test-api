import 'reflect-metadata'; // this shim is required
import * as request from 'supertest'

import { fakeUser } from './fakeDb/fakeUser'
import { server, testAdress } from '../fakeServer'
import { testConnection } from './fakeDb/fakeDB'
import { testing } from '../db'


let user = fakeUser
let userId;
let password = user.password
let req;


beforeAll(async () => {
  await testConnection()
  console.log(testing);
  // console.log(await testConnection().getConnectionString());
  server
  req = request(testAdress);
}, 600000)
afterAll(() => setTimeout(() => process.exit(), 1000))

describe('route users', async () => {
  test('get users', async () => {
    const response = await req.get('/')
    console.log(response.status);
    expect(response.status).toBe(200)
  });

  test('post user', async () => {
    const response = await req.post('/users').send(user)
    expect(response.status).toBe(201)
  }, 10000);
  test('post existing user', async () => {
    const response = await req.post('/users').send(user)
    expect(response.status).toBe(405)
  });
  test('get users', async () => {
    const response = await req.get('/users')
    userId = response.body[0]._id
    console.log(response.body);
    console.log(response.status);

    expect(response.status).toBe(200)
  });
  // test('delete user', async () => {
  //   const response = await req.delete(`/users/${userId}`)
  //   expect(response.status).toBe(200)
  //   expect(response).toBeDefined()
  // });
});
