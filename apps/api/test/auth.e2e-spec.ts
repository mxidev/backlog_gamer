import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user and return token', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'test@example.com', password: 'password123' })
        .expect(201)
        .expect((res) => {
          expect(res.body.user.email).toBe('test@example.com');
          expect(res.body.access_token).toBeDefined();
          expect(typeof res.body.access_token).toBe('string');
        });
    });

    it('should reject duplicate email', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'dup@example.com', password: 'password123' })
        .expect(201);

      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'dup@example.com', password: 'password456' })
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain('ya está registrado');
        });
    });

    it('should reject invalid email', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'not-an-email', password: 'password123' })
        .expect(400);
    });

    it('should reject short password', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'test@example.com', password: 'short' })
        .expect(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'login@example.com', password: 'password123' });
    });

    it('should login with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'login@example.com', password: 'password123' })
        .expect(201)
        .expect((res) => {
          expect(res.body.user.email).toBe('login@example.com');
          expect(res.body.access_token).toBeDefined();
        });
    });

    it('should reject invalid password', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'login@example.com', password: 'wrongpassword' })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toContain('Credenciales inválidas');
        });
    });

    it('should reject non-existent user', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'nobody@example.com', password: 'password123' })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toContain('Credenciales inválidas');
        });
    });
  });

  describe('GET /api/v1/auth/me', () => {
    let token: string;

    beforeEach(async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'me@example.com', password: 'password123' });
      token = res.body.access_token;
    });

    it('should return user profile with valid token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe('me@example.com');
          expect(res.body.id).toBeDefined();
        });
    });

    it('should reject request without token', () => {
      return request(app.getHttpServer()).get('/api/v1/auth/me').expect(401);
    });

    it('should reject request with invalid token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});