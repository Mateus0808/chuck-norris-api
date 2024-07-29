import { AppModule } from './../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('ChuckNorrisController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/chuck-norris-fact/categories (GET)', async () => {
    return request(app.getHttpServer())
      .get('/chuck-norris-fact/categories')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.categories).toBeInstanceOf(Array);
        expect(res.body.categories.length).toBeGreaterThan(0);
      });
  });

  it('/chuck-norris-fact/free-text (GET)', async () => {
    return request(app.getHttpServer())
      .get('/chuck-norris-fact/free-text?query=funny')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('value');
      });
  });

  it('/chuck-norris-fact/free-text (GET) - invalid query', () => {
    return request(app.getHttpServer())
      .get('/chuck-norris-fact/free-text?query=invalidtext')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual('Piada não encontrada');
      });
  });

  it('/chuck-norris-fact/random (GET) - valid category', () => {
    return request(app.getHttpServer())
      .get('/chuck-norris-fact/random?category=animal')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('value');
      });
  });

  it('/chuck-norris-fact/random (GET) - invalid category', () => {
    return request(app.getHttpServer())
      .get('/chuck-norris-fact/random?category=invalidcategory')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          'Não foi possível encontrar o fato aleatório: invalidcategory',
        );
      });
  });
});
