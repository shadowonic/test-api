import {request} from '../user.routes.test'

export const tetst = ( user, token, userId, password) => describe('route users', async () => {
    test('test routes', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
    test('post user', async () => {
      const response = await request.post('/users').send(user);
      expect(response.status).toBe(201);
    });
    test('post existing user', async () => {
      const response = await request.post('/users').send(user);
      expect(response.status).toBe(500);
    });
    test('post admin', async () => {
      user.firstName = 'shadow';
      user.email = 'someEmail@gmail.com'
      password = user.password
      const response = await request.post('/users').send(user);
      expect(response.status).toBe(201);
    });
    test('login', async () => {
      
      const response = await request.post("/login").send({email: user.email, password: password});
      token = response.body.token
      expect(response.status).toBe(200)
    })
    test('post user with wrong email', async () => {
      user.email = 'NotEmail';
      const response = await request.post('/users').send(user);
      expect(response.status).toBe(400);
    });
    test('test token', async() => {
      const response = await request.get('/admin').set({authorization: token })
      expect(response.status).toBe(200)
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