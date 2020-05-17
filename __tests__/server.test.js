const request = require('supertest');
const app = require('../src/server/index');


describe('Post Endpoints', () => {
  it('should route to index.html', async () => {
    const res = await request(app)
      .get('/')
      .send('./dist/landing.html')
    expect(res.statusCode).toEqual(200);
  })
})

describe('Post Endpoints', () => {
  it('should route to trips.html', async () => {
    const res = await request(app)
      .get('/')
      .send('./dist/trips.html')
    expect(res.statusCode).toEqual(200);
  })
})
