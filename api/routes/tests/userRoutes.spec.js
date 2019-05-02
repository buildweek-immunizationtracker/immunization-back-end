const server = require('../../server');
const request = require('supertest');
const db = require('../../../data/dbConfig');

const testUser = {
  username: 'TestUser',
  password: 'TestPassword',
  email: 'TestEmail',
};

let token;
beforeAll(async () => {
  const response = await request(server)
    .post('/register')
    .send(testUser)
    .set('Content-Type', 'application/json');
  token = `Bearer ${response.body.token}`;
});

afterAll(async done => {
  await db('users').where({ email: testUser.email }).del();
  done();
})

describe('GET /user', () => {
  it('Should return appropriate response', async () => {
    const response = await request(server)
      .get('/user')
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
    expect(response.status).toBe(200);

  });
});

describe('PUT /user', () => {
  it('Should modify user information', async () => {
    const response = await request(server)
      .put('/user')
      .send({ username: 'ThisIsARandomUsernameNobodyShouldHave' })
      .set('Authorization', token);
    const user = response.body.success;
    expect(response.status).toBe(200);
    expect(user.username).toBe('ThisIsARandomUsernameNobodyShouldHave');
    expect(user.email).toBe(testUser.email);
  });
});

describe('DELETE /user', () => {
  const userToBeDeleted = {
    username: 'DeadManWalking',
    password: 'testing123',
    email: 'SomethingOrAnother@email.com'
  };
  let deleteToken;
  beforeAll(async () => {
    const response = await request(server)
      .post('/register')
      .send(userToBeDeleted)
      .set('Content-Type', 'application/json');
    deleteToken = `Bearer ${response.body.token}`;
  });
  afterAll(async () => { // To ensure deletion if tests are not successful
    await db('users').where({ username: userToBeDeleted.username }).del();
  });
  it('Should remove user from database', async () => {
    const response = await request(server)
      .delete('/user')
      .set('Authorization', deleteToken)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.usersDeleted).toBe(1);
    const usersLeft = await db('users').where({ username: userToBeDeleted.username });
    expect(usersLeft).toEqual([]);
  });
});