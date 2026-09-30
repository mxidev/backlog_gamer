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
});
