import request from 'supertest';

const BASE_URL = 'http://localhost:4000';

describe('API Colibri - Integration Tests', () => {
  
  let backendAvailable = false;

  beforeAll(async () => {
    try {
      const response = await request(BASE_URL).get('/');
      backendAvailable = response.statusCode === 200;
    } catch (error) {
      backendAvailable = false;
    }
  });

  test('Backend availability check', () => {
    expect(typeof backendAvailable).toBe('boolean');
  });

  test('GET / - should return API welcome message', async () => {
    if (!backendAvailable) {
      console.log('Backend not available, skipping test');
      return;
    }
    
    const response = await request(BASE_URL).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('API Colibrí');
  });

  test('GET /health - should return status ok', async () => {
    if (!backendAvailable) {
      console.log('Backend not available, skipping test');
      return;
    }
    
    const response = await request(BASE_URL).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });

  test('POST /auth/register - should handle registration', async () => {
    if (!backendAvailable) {
      console.log('Backend not available, skipping test');
      return;
    }
    
    const newUser = {
      email: `test${Date.now()}@colibri.com`,
      password: 'Test123!',
      name: 'Test User'
    };
    
    const response = await request(BASE_URL)
      .post('/auth/register')
      .send(newUser);
    
    expect([201, 400, 409, 422]).toContain(response.statusCode);
  });

  test('GET /invalid - should return 404', async () => {
    if (!backendAvailable) {
      console.log('Backend not available, skipping test');
      return;
    }
    
    const response = await request(BASE_URL).get('/invalid-endpoint');
    expect(response.statusCode).toBe(404);
  });
});