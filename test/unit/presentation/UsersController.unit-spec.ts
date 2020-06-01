import { Test } from '@nestjs/testing';
import { UsersController } from 'presentation/controllers/UsersController';
import { UsersUseCases } from 'application/use-cases/UsersUseCases';
import { User } from 'domain/models/User';
import { Post } from 'domain/models/Post';
import { UserVM } from 'presentation/view-models/users/UserVM';

describe('UsersController Test', () => {
  let usersController: UsersController;
  let usersUseCases: UsersUseCases;

  const POST = new Post('Title', 'Text', null, 1);
  POST.createdAt = new Date('2020-05-31 02:20:58.037572-03');
  POST.updatedAt = new Date('2020-05-31 02:20:58.037572-03');
  const USER = new User('John Doe', 'john.doe@gmail.com', [POST], 1);
  USER.createdAt = new Date('2020-05-31 02:20:58.037572-03');
  USER.updatedAt = new Date('2020-05-31 02:20:58.037572-03');

  const USER_VM = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    createdAt: new Date('2020-05-31 02:20:58.037572-03'),
    updatedAt: new Date('2020-05-31 02:20:58.037572-03'),
  } as UserVM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersController,
        {
          provide: UsersUseCases,
          useFactory: () => ({
            getUserById: jest.fn(() => true),
            getUsers: jest.fn(() => true),
            createUser: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    usersUseCases = module.get<UsersUseCases>(UsersUseCases);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should return the UserVM when get a valid user in GET /users/:id', async () => {
    jest
      .spyOn(usersUseCases, 'getUserById')
      .mockImplementation(async () => USER);

    const userVM = await usersController.get('1');

    expect(userVM instanceof UserVM).toBeTruthy();
    expect(userVM).toEqual(USER_VM);
  });

  it('should return an list of UserVM when get all users in GET /users', async () => {
    jest
      .spyOn(usersUseCases, 'getUsers')
      .mockImplementation(async () => [USER]);

    const usersVM = await usersController.getAll();

    expect(usersVM).toHaveLength(1);
    expect(usersVM).toEqual([USER_VM]);
  });

  it('should return a UserVM when creating a user in POST /users', async () => {
    jest
      .spyOn(usersUseCases, 'createUser')
      .mockImplementation(async () => USER);

    const userVM = await usersController.createUser(USER);

    expect(userVM instanceof UserVM).toBeTruthy();
    expect(userVM).toEqual(USER_VM);
  });
});
