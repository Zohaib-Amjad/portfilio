const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const Message = require('../models/Message');
const app = require('../server');

test('GET /api/health reports a healthy API', async () => {
  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
});

test('POST /api/contact rejects invalid input before persistence', async () => {
  const response = await request(app).post('/api/contact').send({
    name: '',
    email: 'not-an-email',
    message: 'short',
  });

  assert.equal(response.status, 422);
  assert.equal(response.body.success, false);
  assert.ok(response.body.errors.length >= 3);
});

test('POST /api/contact validates and persists a message', async (t) => {
  const originalCreate = Message.create;
  Message.create = async (payload) => ({ _id: 'message-id', ...payload });
  t.after(() => {
    Message.create = originalCreate;
  });

  const response = await request(app).post('/api/contact').send({
    name: 'Zohaib',
    email: 'zohaib@example.com',
    message: 'I would like to discuss a frontend project.',
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.id, 'message-id');
});
