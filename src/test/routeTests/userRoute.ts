import { request } from '../user.routes.test';

export const userRoute = (user, admin) =>{
 
    let userId;
    test('post user', async () => {
      const response = await request.post('/users').send(user);
      expect(response.status).toBe(201);  
    });
    test('post existing user', async () => {
      const response = await request.post('/users').send(user);
      expect(response.status).toBe(500);      
    });
    test('post admin', async () => {
      const response = await request.post('/users').send(admin);
      expect(response.status).toBe(201);
    });
    test('post user with wrong email', async () => {
      const response = await request.post('/users').send({...user, email:'NotEmail' });
      expect(response.status).toBe(400);
    });
    test('test routes', async () => {
      const response = await request.get('/users');
      userId = response.body[0]._id;
      expect(response.status).toBe(200);
    });
    test('get user by id', async () => {
      const response = await request.get(`/users/${userId}`);
      expect(response.status).toBe(200);
    });
    // test('delete user', async () => {
    //   const response = await request.delete(`/users/${userId}`);
    //   expect(response.status).toBe(200);
    //   expect(response).toBeDefined();
    // });
  
}