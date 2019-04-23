const request = require('supertest');
const server = require('./server');

describe('GET /users', () => {
    it('Should return status 200 OK', async () => {
        const response = await request(server).get('/users');
        expect(response.status).toBe(200);
    });
    it('Should return an array', async () => {
        const response = await request(server).get('/users');
        expect(Array.isArray(response.body.users)).toBe(true);
    });
});

describe('GET /users/:id/patients', () => {
    it('Should return status 200 OK', async () => {
        const response = await request(server).get('/users/1/patients');
        expect(response.status).toBe(200);
    });
    it('Should return an array', async () => {
        const response = await request(server).get('/users/1/patients');
        expect(Array.isArray(response.body.patients)).toBe(true);
    });
    it('Should only return entries with userId matching current ID param', async () => {
        const response = await request(server).get('/users/1/patients');
        expect(response.body.patients.every(x => x.userId === 1)).toBe(true);
    });
    it('Should return status 404 NOT FOUND if passed nonexistent user', async () => {
        const response = await request(server).get('/users/999999/patients');
        expect(response.status).toBe(404);
    });
});

describe('GET /patients/:id/history', () => {
    it('Should return status 200 OK', async () => {
        const response = await request(server).get('/patients/1/history');
        expect(response.status).toBe(200);
    });
    it('Should return an array', async () => {
        const response = await request(server).get('/patients/1/history');
        expect(Array.isArray(response.body.history)).toBe(true);
    });
    it('Should return status 404 NOT FOUND if passed nonexistent patient', async () => {
        const response = await request(server).get('/patients/9999999/history');
        expect(response.status).toBe(404);
    });
});