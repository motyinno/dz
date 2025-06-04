import request from 'supertest';
import app from '../index';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import { Auth } from '../models/Auth';
import { setupTestDb, teardownTestDb } from './setup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

describe('User Controller', () => {
  let authToken: string;
  let testUser: User;

  beforeAll(async () => {
    await setupTestDb();
    
    // Create a test auth user
    const authRepository = AppDataSource.getRepository(Auth);
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash('password123', salt);
    
    const authUser = await authRepository.save({
      name: 'Test User',
      email: 'test@example.com',
      password_hash
    });
    
    // Generate JWT token for testing protected routes
    authToken = jwt.sign(
      { id: authUser.id, email: authUser.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    );
    
    // Create a test user
    const userRepository = AppDataSource.getRepository(User);
    testUser = await userRepository.save({
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        street: 'Test Street',
        suite: 'Suite 123',
        city: 'Test City',
        zipcode: '12345-6789',
        geo: {
          lat: '40.7128',
          lng: '-74.0060'
        }
      },
      phone: '123-456-7890',
      website: 'johndoe.com',
      company: {
        name: 'Test Company',
        catchPhrase: 'Testing is fun',
        bs: 'test business'
      }
    });
  });

  afterAll(async () => {
    await teardownTestDb();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      const response = await request(app).get(`/users/${testUser.id}`);
      
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(testUser.id);
      expect(response.body.name).toBe(testUser.name);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/users/9999');
      
      expect(response.status).toBe(404);
    });
  });

  describe('POST /users', () => {
    it('should create a new user when authenticated', async () => {
      const newUser = {
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        address: {
          street: 'Another Street',
          suite: 'Suite 456',
          city: 'Another City',
          zipcode: '98765-4321',
          geo: {
            lat: '34.0522',
            lng: '-118.2437'
          }
        },
        phone: '987-654-3210',
        website: 'janedoe.com',
        company: {
          name: 'Another Company',
          catchPhrase: 'Another catchphrase',
          bs: 'another business'
        }
      };
      
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Unauthorized User',
          username: 'unauthorized',
          email: 'unauthorized@example.com'
        });
      
      expect(response.status).toBe(401);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user when authenticated', async () => {
      const updatedData = {
        name: 'John Doe Updated',
        username: 'johndoeupdated',
        email: 'johnupdated@example.com'
      };
      
      const response = await request(app)
        .put(`/users/${testUser.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData);
      
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.username).toBe(updatedData.username);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .put(`/users/${testUser.id}`)
        .send({
          name: 'Unauthorized Update'
        });
      
      expect(response.status).toBe(401);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user when authenticated', async () => {
      const response = await request(app)
        .delete(`/users/${testUser.id}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      
      // Verify user is deleted
      const checkResponse = await request(app).get(`/users/${testUser.id}`);
      expect(checkResponse.status).toBe(404);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .delete(`/users/${testUser.id}`)
      
      expect(response.status).toBe(401);
    });
  });
});
