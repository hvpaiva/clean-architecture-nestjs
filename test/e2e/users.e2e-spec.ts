import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { UsersModule } from 'infrastructure/ioc/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from 'infrastructure/environments';

describe('Users', () => {
  let app: INestApplication;
  let usersRepository: IUsersRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot(),
        ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
          envFilePath: setEnvironment(),
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    usersRepository = module.get<IUsersRepository>(IUsersRepository);
  });

  it(`/POST users`, async () => {
    const { body } = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'John Doe', email: 'john.doe@gmail.com' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.CREATED);

    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
    expect(body.updatedAt).toBeTruthy();

    expect(body).toEqual({
      id: body.id,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
    });
  });

  it(`/GET users`, async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK);

    expect(body).toHaveLength(1);
    expect(body[0].id).toBeTruthy();
    expect(body[0].createdAt).toBeTruthy();
    expect(body[0].updatedAt).toBeTruthy();

    expect(body).toEqual([
      {
        id: body[0].id,
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        createdAt: body[0].createdAt,
        updatedAt: body[0].updatedAt,
      },
    ]);
  });

  it(`/GET users/:id`, async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users/1')
      .expect(HttpStatus.OK);

    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
    expect(body.updatedAt).toBeTruthy();

    expect(body).toEqual({
      id: body.id,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
    });
  });

  afterAll(async () => {
    await usersRepository.query(`DELETE FROM users;`);
    await usersRepository.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
    await app.close();
  });
});
