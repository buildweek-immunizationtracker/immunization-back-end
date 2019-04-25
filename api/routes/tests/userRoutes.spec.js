const server = require('../../server');
const request = require('supertest');
const db = require('../../../data/dbConfig');

const testUser = {
  username: 'TestUser',
  password: 'TestPassword',
  email: 'TestEmail@email.com',
};

const testPatient = {
  firstName: 'Test',
  lastName: 'Patient',
  birthDate: '1/1/1995'
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

describe('POST /users/:id/patients', () => {
  afterEach(async () => {
    db('patients').where({ firstName: testPatient.firstName, lastName: testPatient.lastName }).del();
  });

  it('Should return appropriate response',  async () => {
    const response = await request(server)
      .post('/users/1/patients')
      .send(testPatient)
      .set('Authorization', token);
    expect(response.status).toBe(201);
    expect(typeof response.body.id).toBe('number');
  });

  it('Should return 400 BAD REQUEST if mandatory keys are not sent', async () => {
    const { lastName, ...incorrectPatient } = testPatient;
    const response = await request(server)
      .post('/users/1/patients')
      .send(incorrectPatient)
      .set('Authorization', token);
    expect(response.status).toBe(400);
  });

  it('Should return 400 BAD REQUEST if mandatory keys are not sent', async () => {
    const { lastName, ...incorrectPatient } = testPatient;
    const response = await request(server)
      .post('/users/1/patients')
      .send(incorrectPatient)
      .set('Authorization', token);
    expect(response.status).toBe(400);
  });

  it('Should return 404 NOT FOUND if userId is not valid', async () => {
    const response = await request(server)
      .post('/users/99999999/patients')
      .send(testPatient)
      .set('Authorization', token);
    expect(response.status).toBe(404);
  });
});

describe('PUT /users/:id', async () => {
  let token;
  beforeAll(async () => {
    const response = await request(server)
      .post('/register')
      .send(testUser);
    token = `Bearer ${response.body.token}`;   
  });

  afterAll(async () => {
    db('users').where({ username: testUser.username }).del();
  });

  const response = await request(server)
    .put('/users')
    .send({ ...testUser, username: 'ThisIsARandomUsernameNobodyShouldHave' })
    .set('Authorization', token);
  expect(response.status).toBe(200);
  expect(response.body.username).toBe('ThisIsARandomUsernameNobodyShouldHave');
});
