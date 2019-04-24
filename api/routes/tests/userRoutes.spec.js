const request = require('supertest');
const server = require('../../server');
const db = require('../../../data/dbConfig');

const testUser = {
    username: 'TestUser',
    password: 'TestPassword',
    email: 'TestEmail@email.com'
};
let token;

beforeAll(async () => {
    await db('users').where({ username: testUser.username }).del();
    const response = await request(server)
        .post('/register')
        .send(testUser)
        .set('Content-Type', 'application/json');
    token = `Bearer ${response.body.token}`;
});

afterAll(async () => {
    await db('users').where({ username: testUser.username }).del();
});

describe('GET /users', () => {
    it('Should return status 200 OK', async () => {
        const response = await request(server)
            .get('/users')
            .set('Content-Type', 'application/json')
            .set('Authorization', token);
        expect(response.status).toBe(200);
    });
    it('Should return an array', async () => {
        const response = await request(server)
            .get('/users')
            .set('Content-Type', 'application/json')
            .set('Authorization', token);
        expect(Array.isArray(response.body.users)).toBe(true);
    });
});

describe('GET /users/:id/patients', () => {
    it('Should return status 200 OK', async () => {
        const response = await request(server)
            .get('/users/1/patients')
            .set('Content-Type', 'application/json')
            .set('Authorization', token);
        expect(response.status).toBe(200);
    });
    it('Should return an array', async () => {
        const response = await request(server)
            .get('/users/1/patients')
            .set('Content-Type', 'application/json')
            .set('Authorization', token);
        expect(Array.isArray(response.body.patients)).toBe(true);
    });
    it('Should only return entries with userId matching current ID param', async () => {
        const response = await request(server)
            .get('/users/1/patients')
            .set('Content-Type', 'application/json')
            .set('Authorization', token);
        expect(response.body.patients.every(x => x.userId === 1)).toBe(true);
    });
    it('Should return status 404 NOT FOUND if passed nonexistent user', async () => {
        const response = await request(server)
            .get('/users/999999/patients')
            .set('Content-Type', 'application/json')
            .set('Authorization', token);
        expect(response.status).toBe(404);
    });
});