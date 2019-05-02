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
  afterAll(async done => {
    await db('users')
      .where({ username: testUser.username })
      .del();
    done();
  });

  describe('POST /patients', () => {
    afterEach(async () => {
      await db('patients').where({ firstName: testPatient.firstName, lastName: testPatient.lastName }).del();
    });
  
    it('Should return appropriate response',  async () => {
      const response = await request(server)
        .post('/patients')
        .send(testPatient)
        .set('Authorization', token);
      expect(response.status).toBe(201);
      expect(typeof response.body.success.id).toBe('string');
    });
  
    it('Should return 400 BAD REQUEST if mandatory keys are not sent', async () => {
      const { lastName, ...incorrectPatient } = testPatient;
      const response = await request(server)
        .post('/patients')
        .send(incorrectPatient)
        .set('Authorization', token);
      expect(response.status).toBe(400);
    });
});