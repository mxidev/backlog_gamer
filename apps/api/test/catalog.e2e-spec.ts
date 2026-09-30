import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { CatalogService } from './../src/catalog/catalog.service';

describe('CatalogController (e2e)', () => {
  let app: INestApplication;

  const mockCatalogService = {
    searchGames: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CatalogService)
      .useValue(mockCatalogService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('/api/v1/catalog/search (GET)', () => {
    it('should return empty array when query is empty', () => {
      return request(app.getHttpServer())
        .get('/api/v1/catalog/search')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(0);
        });
    });

    it('should return empty array when query is whitespace', () => {
      return request(app.getHttpServer())
        .get('/api/v1/catalog/search?q=   ')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(0);
        });
    });

    it('should return games when query is valid', () => {
      const mockGames = [
        {
          id: 1,
          name: 'The Legend of Zelda: Breath of the Wild',
          backgroundImage: 'https://example.com/zelda.jpg',
          released: '2017-03-03',
        },
        {
          id: 2,
          name: 'The Legend of Zelda: Ocarina of Time',
          backgroundImage: 'https://example.com/oot.jpg',
          released: '1998-11-21',
        },
      ];

      mockCatalogService.searchGames.mockResolvedValue(mockGames);

      return request(app.getHttpServer())
        .get('/api/v1/catalog/search?q=zelda')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(2);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('name');
          expect(res.body[0]).toHaveProperty('backgroundImage');
          expect(res.body[0]).toHaveProperty('released');
          expect(mockCatalogService.searchGames).toHaveBeenCalledWith('zelda');
        });
    });

    it('should handle service errors gracefully', () => {
      mockCatalogService.searchGames.mockRejectedValue(new Error('API Error'));

      return request(app.getHttpServer())
        .get('/api/v1/catalog/search?q=test')
        .expect(500);
    });
  });
});
