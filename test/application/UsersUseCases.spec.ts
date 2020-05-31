import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UpdateResult, DeleteResult } from 'typeorm';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { UsersUseCases } from 'application/use-cases/UsersUseCases';
import { User } from 'domain/models/User';

describe('User UseCases Test', () => {
  let usersRepository: IUsersRepository;
  let usersUseCases: UsersUseCases;

  const USER = new User('John Doe', 'john.doe@gmail.com', null, 1);
  const USER_OBJECT = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    posts: null,
    createdAt: new Date('2020-05-31T06:37:07.969Z'),
    updatedAt: new Date('2020-05-31T06:37:07.969Z'),
  } as User;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersUseCases,
        {
          provide: IUsersRepository,
          useFactory: () => ({
            save: jest.fn(() => true),
            findOne: jest.fn(() => true),
            find: jest.fn(() => true),
            update: jest.fn(() => true),
            delete: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    usersRepository = module.get<IUsersRepository>(IUsersRepository);
    usersUseCases = module.get<UsersUseCases>(UsersUseCases);
  });

  it('Shoud create an user', async () => {
    jest
      .spyOn(usersRepository, 'save')
      .mockImplementation(async () => USER_OBJECT);
    const user = await usersUseCases.save(USER_OBJECT);

    expect(user instanceof User);
    expect(user).toBe(USER_OBJECT);
  });

  it('Shoud get an user by its Id', async () => {
    jest
      .spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => USER_OBJECT);
    const user = await usersUseCases.getById(1);

    expect(user instanceof User);
    expect(user).toBe(USER_OBJECT);
  });

  it('Shoud throw an error if user is not found', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await usersUseCases.getById(2);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe('The user {2} has not found.');
    }
  });

  it('Shoud get all users', async () => {
    jest
      .spyOn(usersRepository, 'find')
      .mockImplementation(async () => [USER_OBJECT]);
    const users = await usersUseCases.get();

    expect(users).toHaveLength(1);
    expect(users).toStrictEqual([USER_OBJECT]);
  });

  it('Shoud update a user', async () => {
    jest
      .spyOn(usersRepository, 'update')
      .mockImplementation(async () => ({ affected: 1 } as UpdateResult));
    const updated = await usersUseCases.update(USER);

    expect(updated).toBeTruthy();
  });

  it('Shoud delete a user', async () => {
    jest
      .spyOn(usersRepository, 'delete')
      .mockImplementation(async () => ({ affected: 1 } as DeleteResult));
    const deleted = await usersUseCases.delete(1);

    expect(deleted).toBeTruthy();
  });
});
