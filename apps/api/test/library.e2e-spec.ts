import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('LibraryController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    // Register a test user and get token
    const registerResponse = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({ email: 'library@test.com', password: 'password123' });

    authToken = registerResponse.body.access_token;
    userId = registerResponse.body.user.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/v1/library/games', () => {
    it('should add a game to library', () => {
      return request(app.getHttpServer())
        .post('/api/v1/library/games')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          externalGameId: 123,
          title: 'Test Game',
          coverImage: 'https://example.com/cover.jpg',
          released: '2023-01-01',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe('Test Game');
          expect(res.body.status).toBe('pending');
          expect(res.body.externalGameId).toBe(123);
        });
    });

    it('should reject duplicate game', async () => {
      // First add
      await request(app.getHttpServer())
        .post('/api/v1/library/games')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          externalGameId: 456,
          title: 'Duplicate Game',
        })
        .expect(201);

      // Second add (should fail)
      return request(app.getHttpServer())
        .post('/api/v1/library/games')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          externalGameId: 456,
          title: 'Duplicate Game',
        })
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain('ya está en tu biblioteca');
        });
    });

    it('should reject unauthenticated request', () => {
      return request(app.getHttpServer())
        .post('/api/v1/library/games')
        .send({
          externalGameId: 789,
          title: 'Unauthorized Game',
        })
        .expect(401);
    });
  });

  describe('GET /api/v1/library/games', () => {
    it('should return user library', () => {
      return request(app.getHttpServer())
        .get('/api/v1/library/games')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('should reject unauthenticated request', () => {
      return request(app.getHttpServer())
        .get('/api/v1/library/games')
        .expect(401);
    });
  });

  describe('PATCH /api/v1/library/games/:id/status', () => {
    let gameId: string;

    beforeAll(async () => {
      // Add a game to update its status
      const response = await request(app.getHttpServer())
        .post('/api/v1/library/games')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          externalGameId: 999,
          title: 'Status Test Game',
        });
      gameId = response.body.id;
    });

    it('should update game status', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/library/games/${gameId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'playing' })
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('playing');
        });
    });

    it('should reject invalid status', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/library/games/${gameId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'invalid' })
        .expect(400);
    });

    it('should reject non-existent game', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/library/games/non-existent-id/status')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'playing' })
        .expect(404);
    });

    it('should reject unauthenticated request', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/library/games/${gameId}/status`)
        .send({ status: 'playing' })
        .expect(401);
    });

    it('should reject other user trying to update', async () => {
      // Register another user
      const otherUserResponse = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'other@test.com', password: 'password123' });

      const otherAuthToken = otherUserResponse.body.access_token;

      return request(app.getHttpServer())
        .patch(`/api/v1/library/games/${gameId}/status`)
        .set('Authorization', `Bearer ${otherAuthToken}`)
        .send({ status: 'completed' })
        .expect(403)
        .expect((res) => {
          expect(res.body.message).toContain('No puedes modificar juegos de otros usuarios');
        });
    });
  });

  describe('PATCH /api/v1/library/games/:id/personal-info', () => {
    let gameId: string;

    beforeAll(async () => {
      // Add a game to update its personal info
      const response = await request(app.getHttpServer())
        .post('/api/v1/library/games')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          externalGameId: 888,
          title: 'Personal Info Test Game',
        });
      gameId = response.body.id;
    });

    it('should update personal info', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/library/games/${gameId}/personal-info`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          platform: 'PC',
          startDate: '2023-01-01',
          endDate: '2023-06-01',
          personalNote: 'Great game!',
          rating: 9,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.platform).toBe('PC');
          expect(res.body.startDate).toBe('2023-01-01');
          expect(res.body.endDate).toBe('2023-06-01');
          expect(res.body.personalNote).toBe('Great game!');
          expect(res.body.rating).toBe(9);
        });
    });

    it('should update partial personal info', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/library/games/${gameId}/personal-info`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          rating: 10,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.rating).toBe(10);
          expect(res.body.platform).toBe('PC'); // Should keep previous value
        });
    });

    it('should reject invalid rating (out of range)', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/library/games/${gameId}/personal-info`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ rating: 15 })
        .expect(400);
    });

    it('should reject non-existent game', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/library/games/non-existent-id/personal-info')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ platform: 'PS5' })
        .expect(404);
    });

    it('should reject unauthenticated request', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/library/games/${gameId}/personal-info`)
        .send({ platform: 'PS5' })
        .expect(401);
    });

    it('should reject other user trying to update', async () => {
      const otherUserResponse = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'other2@test.com', password: 'password123' });

      const otherAuthToken = otherUserResponse.body.access_token;

      return request(app.getHttpServer())
        .patch(`/api/v1/library/games/${gameId}/personal-info`)
        .set('Authorization', `Bearer ${otherAuthToken}`)
        .send({ platform: 'Xbox' })
        .expect(403);
    });
  });
});
