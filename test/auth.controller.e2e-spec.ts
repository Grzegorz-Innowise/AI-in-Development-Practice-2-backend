import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { type Server } from 'http';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const testUser = {
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.bizss',
    password: 'testpassword',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    lat: '-37.3159',
    lng: '81.1496',
    companyName: 'Romaguera-Crona',
    companyCatchPhrase: 'Multi-layered client-server neural-net',
    companyBs: 'harness real-time e-markets',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('POST /auth/register - should register a new user', async () => {
    const response = await request(app.getHttpServer() as Server)
      .post('/auth/register')
      .send(testUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', testUser.email);
  });

  it('POST /auth/login - should login user and set refreshToken cookie', async () => {
    const response = await request(app.getHttpServer() as Server)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('user');
    expect(response.headers['set-cookie']).toBeDefined();

    const setCookieHeader = response.headers['set-cookie'];
    const cookies = Array.isArray(setCookieHeader)
      ? setCookieHeader.join(';')
      : String(setCookieHeader ?? '');
    expect(cookies).toContain('refreshToken=');
  });

  afterAll(async () => {
    await app.close();
  });
});
