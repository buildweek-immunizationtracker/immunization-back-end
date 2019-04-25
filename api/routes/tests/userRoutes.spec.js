const server = require('../../server');
const request = require('supertest');
const db = require('../../../data/dbConfig');

const testUser = {
  username: 'TestUser',
  password: 'TestPassword',
  email: 'TestEmail@email.com',
};

let token;
beforeAll(async () => {
  const response = await request(server)
    .post('/register')
    .send(testUser)
    .set('Content-Type', 'application/json');
  token = `Bearer ${response.body.token}`;
});
afterAll(async () => {
  await db('users')
    .where({ username: testUser.username })
    .del();
});

describe('GET /users', () => {
  it('Should return appropriate response', async () => {
    const response = await request(server)
      .get('/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.users)).toBe(true);
  });
});

describe('GET /users/:id/patients', () => {
  it('Should return appropriate response', async () => {
    const response = await request(server)
      .get('/users/1/patients')
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.patients)).toBe(true);
  });
  it('Should only return patients with matching userId', async () => {
    const response = await request(server)
      .get('/users/1/patients')
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
    expect(response.body.patients.every(x => x.userId === 1)).toBe(true);
  });
});
