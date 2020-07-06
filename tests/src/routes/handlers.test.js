const mongoose = require('mongoose');
const User = require('./../../../src/models');
const { insertUser, fetchUser } = require('../../../src/routes/handlers');

const DB_URI = 'mongodb://localhost:27017/bonnIIytester';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  return req;
};

const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test User route handlers', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(DB_URI, options);
    } catch (error) {
      console.log('Database connection error');
    }
  });

  describe('Create user operations', () => {
    it('username should be provided', async () => {
      let req = mockRequest();
      req.body.username = null;
      req.body.password = 'password';
      let res = mockResponse();

      insertUser(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username is required' });
    });

    it('Password should be provided', async () => {
      let req = mockRequest();
      req.body.username = 'Brian';
      req.body.password = null;
      let res = mockResponse();

      insertUser(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password is required' });
    });

    it('Creates a new user', async () => {
      let req = mockRequest();
      req.body.username = 'Brian';
      req.body.password = 'password';
      let res = mockResponse();

      await insertUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created' });
    });
  });

  describe('Fetch user operations', () => {
    it('The username should be provided', async () => {
      let req = mockRequest();
      let res = mockResponse();

      await fetchUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'The username should be provided' });
    });

    it('The user should be returned', async () => {
      let req = mockRequest();
      req.params.username = 'Brian';
      let res = mockResponse();

      await fetchUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ user: { username: 'Brian', password: 'password' } });
    });
  });

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    try {
      mongoose.connection.db.dropDatabase();
      mongoose.connection.close();
    } catch (err) {}
    done();
  });
});
