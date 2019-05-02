const server = require('../../server');
const request = require('supertest');
const db = require('../../../data/dbConfig');

const testUser = {
  username: 'TestUser',
  password: 'TestPassword',
  email: 'TestEmail@email.com',
};

describe('/POST /register', () => {
  afterEach(async () => {
    await db('users')
      .where({ username: testUser.username })
      .del();
  });
  it('Should return appropriate response', async () => {
    const response = await request(server)
      .post('/register')
      .send(testUser)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(201);
    expect(typeof response.body.token).toBe('string');
  });

  it('Should return 400 BAD REQUEST if duplicate data is sent', async () => {
    await request(server)
      .post('/register')
      .send(testUser)
      .set('Content-Type', 'application/json');
    const response = await request(server)
      .post('/register')
      .send(testUser)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Username and/or email already associated with an account.');
  });

  it('Should return 400 BAD REQUEST if mandatory keys are not sent', async () => {
    const { username, ...malformedUser } = testUser;
    const response = await request(server)
      .post('/register')
      .send(malformedUser)
      .set('Content_Type', 'application/json');
    expect(response.status).toBe(400);
  });
});

describe('POST /login', () => {
  beforeAll(async () => {
    await request(server)
      .post('/register')
      .send(testUser)
      .set('Content-Type', 'application/json');
  });
  afterAll(async () => {
    await db('users')
      .where({ username: testUser.username })
      .del();
  });
  const { email, ...loginUser } = testUser;
  it('Should return appropriate response', async () => {
    const response = await request(server)
      .post('/login')
      .send(loginUser)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe('string');
  });
  it('Should return 401 UNAUTHORIZED with invalid credentials', async () => {
    const response = await request(server)
      .post('/login')
      .send({ ...loginUser, username: 'NotTheRightName' })
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(401);
    expect(response.body.token).toBe(undefined);
  });
});
