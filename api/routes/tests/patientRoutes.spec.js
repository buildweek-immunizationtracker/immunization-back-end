const server = require('../../server');
const request = require('supertest');
const db = require('../../../data/dbConfig');
  
  const testPatient = {
    firstName: 'Test',
    lastName: 'Patient',
    birthDate: '1970-01-01'
  };
  let token;
  beforeAll(async () => {
    const response = await request(server)
      .post('/login')
      .send({ username: 'john_doe', password: 'password' })
      .set('Content-Type', 'application/json');
    token = `Bearer ${response.body.token}`;
  });
  it('Should return appropriate response',  async () => {
    const response = await request(server)
      .post('/patients')
      .send(testPatient)
      .set('Authorization', token);
    expect(response.status).toBe(201);
    expect(typeof response.body.success.id).toBe('string');
  });
  describe('POST /patients', () => {
    it('Should return 400 BAD REQUEST if mandatory keys are not sent', async () => {
      const { lastName, ...incorrectPatient } = testPatient;
      const response = await request(server)
        .post('/patients')
        .send(incorrectPatient)
        .set('Authorization', token);
      expect(response.status).toBe(400);
    });
});