const request = require('supertest')
const {Genre} = require('../../models/genre');
const mongoose = require('mongoose');
const {User} = require('../../models/user');
const { before } = require('lodash');


let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../server'); });
    afterEach(async () => { 
        await Genre.deleteMany({});
        await server.close(); 
    });

    describe('GET /', () => {
        it('should return a 200 status', async () => {
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        });

        it('should return a compatiable genres objects', async () => {
            await Genre.insertMany([
                {name : 'genre1'},
                {name : 'genre2'}
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });


        it('should return a object with provided id', async () => {
            const genre = new Genre({name : 'genre1'});
            // await Genre.insertMany([genre]);
            genre.save();
            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
            expect(res.body).toHaveProperty('_id', genre._id.toHexString());
        });


        it('should return a 404 cannot find message', async () => {
            // new mongoose.Types.ObjectId().toHexString()
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });

    });

    describe('POST /', () => {
        let token;
        let name;
        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name : name})
        }

        beforeEach(() => {
            token = new User().generateToken();
            name = 'genre1';
        });

        it('should retrun a 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should retrun a 400 if genres are invalid  (name less than 5 characters)', async () => {
            name = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should retrun a 400 if genres are invalid  (name more than 50 characters)', async () => {
            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should retrun save the gnere if it is valid', async () => {
            await exec();
            const genre = await Genre.find({name : 'genre1'});
            expect(genre).not.toBeNull();
        });

        it('should retrun genre if it is valid', async () => {
            const res = await exec();            
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });

    });

});