const request = require('supertest');
const app = require('../../servers/express');
const User = require('../../db/dao/userDao');
const bcrypt = require('bcrypt');

jest.mock('../../db/dao/userDao');
jest.mock('bcrypt');

let cookie;

beforeAll(async () => {
  User.createUser.mockResolvedValue({ 
    _id: "testuserId1", 
    username: "testUsername1", 
    password: "testPassword1"
  });
  User.findUserById.mockResolvedValue({ 
    _id: "testuserId1", 
    username: "testUsername1", 
    password: "testPassword1"
  });
  User.findUserByUsername.mockResolvedValue(null);


  const registerResponse = await request(app)
    .post("/api/users/")
    .send({username: "testUsername1", password: "testPassword1"});

  expect(registerResponse.statusCode).toBe(201);
  expect(registerResponse.body.id).toBeDefined();
  expect(User.findUserByUsername.mock.calls.length).toBe(1);


  User.findUserByUsername.mockResolvedValue({ 
    _id: "testuserId1", 
    username: "testUsername1", 
    password: "testPassword1"
  });
  bcrypt.compare.mockResolvedValue(true)


  const loginResponse = await request(app)
    .post("/api/users/login")
    .send({username: "testUsername1", password: "testPassword1"});

  expect(loginResponse.statusCode).toBe(200);
  expect(loginResponse.headers['set-cookie']).toBeDefined();
  expect(User.findUserByUsername.mock.calls.length).toBe(2);
  cookie = loginResponse.headers['set-cookie'];
})

describe('Testing User API Routes', () => {
  test('Get currentUser', async () => {
    const response = await request(app)
      .get("/api/users/")
      .set('Cookie', cookie);

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe("testUsername1");
    expect(User.findUserById.mock.calls.length).toBe(1);
  });
  test('Get User by Username', async () => {
    User.findUserByUsername.mockResolvedValue({ 
      _id: "testuserId1", 
      username: "testUsername1", 
      password: "testPassword1"
    });

    const response = await request(app)
      .get("/api/users/testUsername1")
      .set('Cookie', cookie);

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe("testUsername1");
    expect(User.findUserById.mock.calls.length).toBe(2);
    expect(User.findUserByUsername.mock.calls.length).toBe(3);  
  });
})