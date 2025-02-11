/*import request from 'supertest';
import app from '../../src/server.js';

describe('API Tests', () => {
  test('GET /api/about/ should return team details', async () => {
    const res = await request(app).get('/api/about/');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/report/ should return report data', async () => {
    const res = await request(app).get('/api/report/?id=123123&year=2025&month=2');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('userid');
  });

  test('POST /api/add/ should add a new cost item', async () => {
    const newCost = {
      userid: '123123',
      description: 'Coffee',
      category: 'food',
      sum: 15
    };
    const res = await request(app).post('/api/add/').send(newCost);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Cost item added successfully');
  });
});*/
