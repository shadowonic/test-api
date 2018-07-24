import { request } from '../user.routes.test';
let adminToken;
let userToken;
export const authRoute = async (user, admin) => {
  test('test routes', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
  });
  test('login user', async () => {
    const response = await request.post('/login').send({ email: user.email, password: user.password });

    userToken = await response.body.token;
    expect(response.status).toBe(200);
  });
  test('login admin', async () => {
    const response = await request.post('/login').send({ email: admin.email, password: admin.password });
    adminToken = await response.body.token;
    expect(response.status).toBe(200);
  });
  test('test user have no right to access', async () => {
    const response = await request.get('/admin').set({ authorization: userToken });
    expect(response.status).toBe(403);
  });
  test('test user have right to access', async () => {
    const response = await request.get('/test').set({ authorization: userToken });
    expect(response.status).toBe(200);
  });
  test('test admin access', async () => {
    const response = await request.get('/admin').set({ authorization: adminToken });
    expect(response.status).toBe(200);
  });
};
