const server = require('../../server');
const request = require('supertest');
const db = require('../../../data/dbConfig');

function generateUser(){
  let id = 0;
  return function createUser(){
    id++;
    return {
      username: `TestUser${id}`,
      password: 'testing',
      email: `TestEmail${id}@email.com`
    }
  }
}

const newUser = generateUser();
describe('/POST /register', () => {
  afterAll(async () => {
    await db('users').where('email', 'like', 'TestEmail%@email.com').del();
  });
  it('Should return appropriate response', async () => {
    const response = await request(server)
      .post('/register')
      .send(newUser())
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(201);
    expect(typeof response.body.token).toBe('string');
  });

  it('Should return 400 BAD REQUEST if duplicate data is sent', async () => {
    const user = newUser();
    await request(server)
      .post('/register')
      .send(user)
      .set('Content-Type', 'application/json');
    const response = await request(server)
      .post('/register')
      .send(user)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Username and/or email already associated with an account.');
  });

  it('Should return 400 BAD REQUEST if mandatory keys are not sent', async () => {
    const { username, ...malformedUser } = newUser();
    const response = await request(server)
      .post('/register')
      .send(malformedUser)
      .set('Content_Type', 'application/json');
    expect(response.status).toBe(400);
  });
});

describe('POST /login', () => {
  const loginUser = {
    username: 'john_doe',
    password: 'password'
  };
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
