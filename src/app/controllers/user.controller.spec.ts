import request from 'supertest';

import TestUtil from '../utils/test';

import App from '../../app';

describe('UserController', () => {
  beforeAll(async () => {
    await TestUtil.openDbConnection();
  });

  afterAll(async () => {
    await TestUtil.closeDbConnection();
  });

  it('should create user when request', async () => {
    const response = await request(App).post('/auth/signup');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body.accessToken.length).not.toEqual(0);
  });
});
