const request = require('supertest');
const {Rental} = require('../../models/rental');
const {User} = require('../../models/user');
const moongose = require('mongoose');
const { move } = require('../../app');





describe('/api/returns', () => {
    let server;
    let rental;
    let customerId;
    let movieId;
    let token;

    const exec = () => {
        return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    };

    beforeEach(async () => { 
        server = require('../../server'); 
        token = new User().generateToken();
        customerId = new moongose.Types.ObjectId();
        movieId = new moongose.Types.ObjectId();
        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            },
        });
        await rental.save();

    })
    afterEach(async () => { 
      await Rental.deleteMany({});
      await server.close(); 
    });


    it('should return 401 if client is not logged in', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if client ID is not provided', async () => {
        customerId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 400 if movie ID is not provided', async () => {
        movieId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 404 if not rental is found', async () => {
        await Rental.deleteMany({});
        const res = await exec();
        expect(res.status).toBe(404);
    });


    it('should return 400 if returned is already process', async () => {
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if vaild request', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });


    it('should set the returnDate if input is valid', async () => {
        const res = await exec();
        const rentalinDd = await Rental.findById(rental._id);
        expect(rentalinDd.dateReturned).toBeDefined();
    });

});