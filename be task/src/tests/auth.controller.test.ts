import request from 'supertest';
import app from '../index';
import { AppDataSource } from '../data-source';
import { Auth } from '../models/Auth';
import { setupTestDb, teardownTestDb } from './setup';

describe('Auth Controller', () => {
  beforeAll(async () => {
    await setupTestDb();
  });

  afterAll(async () => {
    await teardownTestDb();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const newUser = {
        name: 'Test User',
        email: 'register@example.com',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/auth/register')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.message).toBe('User registered successfully');
    });

    it('should return 400 for invalid input', async () => {
      const invalidUser = {
        name: 'Invalid User',
        email: 'invalid-email',
        password: 'pwd'
      };
      
      const response = await request(app)
        .post('/auth/register')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 for duplicate email', async () => {
      const duplicateUser = {
        name: 'Duplicate User',
        email: 'register@example.com',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/auth/register')
        .send(duplicateUser);
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User with this email already exists');
    });
  });

  describe('POST /auth/login', () => {
    it('should login a user with valid credentials', async () => {
      const credentials = {
        email: 'register@example.com',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/auth/login')
        .send(credentials);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.message).toBe('Login successful');
    });

    it('should return 401 for invalid credentials', async () => {
      const invalidCredentials = {
        email: 'register@example.com',
        password: 'wrongpassword'
      };
      
      const response = await request(app)
        .post('/auth/login')
        .send(invalidCredentials);
      
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should return 401 for non-existent user', async () => {
      const nonExistentUser = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/auth/login')
        .send(nonExistentUser);
      
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid email or password');
    });
  });
});
