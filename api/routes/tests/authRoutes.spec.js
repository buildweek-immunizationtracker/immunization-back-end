const server = require('../../server');
const request = require('supertest');
const db = require('../../../data/dbConfig');

describe('/POST /register', () => {
    const testUser = {
        username: 'TestUser',
        password: 'TestPassword',
        email: 'TestEmail@email.com',
    };
    afterEach(async () => {
        await db('users').where({ username: testUser.username }).del();
    })
    it('Should return status 201 CREATED', async () => {
        const response = await request(server)
            .post('/register')
            .send(testUser)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(201);
    });
    it('Should return a string token', async () => {
        const response = await request(server)
            .post('/register')
            .send(testUser)
            .set('Content-Type', 'application/json');
        expect(typeof response.body.token).toBe('string');
    });
    it('Should return a 400 BAD REQUEST if necessary keys are not present', async () => {
        const { username, ...malformedUser } = testUser;
        const response = await request(server)
            .post('/register')
            .send(malformedUser)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(400);
    });
    it('Should return a 400 BAD REQUEST with error message about unique constraint if user is not unique', async () => {
        await request(server)
            .post('/register')
            .send(testUser)
            .set('Content-Type', 'application/json');
        const response = await request(server)
            .post('/register')
            .send(testUser)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email or username already exists.');
    });
});

describe('/POST /login', () => {
    const testUser = {
        username: 'TestUser',
        password: 'TestPassword',
    };
    beforeAll(async () => {
        await request(server)
            .post('/register')
            .send({ username: testUser.username, password: testUser.password, email: 'TestEmail@email.com' })
            .set('Content-Type', 'application/json');
    });
    afterAll(async () => {
        await db('users').where({ username: testUser.username }).del();
    })
    it('Should return status 200 OK', async () => {
        const response = await request(server)
            .post('/login')
            .send(testUser)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
    });
    it('Should return string token', async () => {
        const response = await request(server)
            .post('/login')
            .send(testUser)
            .set('Content-Type', 'application/json');
        expect(typeof response.body.token).toBe('string');
    });
})