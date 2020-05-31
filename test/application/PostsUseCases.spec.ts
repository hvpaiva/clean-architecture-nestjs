import { Test } from '@nestjs/testing';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { PostsUseCases } from 'application/use-cases/PostsUseCases';
import { User } from 'domain/models/User';
import { NotFoundException } from '@nestjs/common';
import { Post } from 'domain/models/Post';

describe('Post UseCases Test', () => {
  let usersRepository: IUsersRepository;
  let postsUseCases: PostsUseCases;

  // const POST_OBJECT = {
  //   id: 1,
  //   title: 'Title',
  //   text: 'Text',
  //   createdAt: new Date('2020-05-31T06:37:07.969Z'),
  //   updatedAt: new Date('2020-05-31T06:37:07.969Z'),
  // };
  const POST = new Post('Title', 'Text', null, 1);
  const POST2 = new Post('Title2', 'Text2', null, 1);
  const USER = new User('John Doe', 'john.doe@gmail.com', [POST], 1);
  const USER2 = new User('John Doe', 'john.doe@gmail.com', [POST, POST2], 1);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostsUseCases,
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
    postsUseCases = module.get<PostsUseCases>(PostsUseCases);
  });

  it('Shoud get all posts of a user', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER);
    const posts = await postsUseCases.getAllPostsByUser(1);

    expect(posts).toHaveLength(1);
    expect(posts).toStrictEqual([POST]);
  });

  it('Shoud get empty array if user has no posts', async () => {
    const user = new User('', '', null, 1);
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => user);

    const posts = await postsUseCases.getAllPostsByUser(1);

    expect(posts).toHaveLength(0);
    expect(posts).toStrictEqual([]);
  });

  it('Shoud throw an error if user is not found', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await postsUseCases.getAllPostsByUser(2);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The user {2} wasn't found.");
    }
  });

  it('Shoud get a post by an user', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER);

    const post = await postsUseCases.getPostByUser(1, 1);

    expect(post instanceof Post).toBeTruthy();
    expect(post).toStrictEqual(POST);
  });

  it('Shoud throw an error if user is not found in getPostByUser', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await postsUseCases.getPostByUser(2, 1);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The user {2} wasn't found.");
    }
  });

  it('Shoud throw an error if post is not found in getPostByUser', async () => {
    try {
      const user = new User('', '', null, 1);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => user);
      await postsUseCases.getPostByUser(1, 1);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The post {1} wasn't found.");
    }
  });

  it('Shoud throw an error if expecific post is not found in getPostByUser', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => USER);
      await postsUseCases.getPostByUser(1, 99);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The post {99} wasn't found.");
    }
  });

  it('Shoud create a post', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER);
    jest.spyOn(usersRepository, 'save').mockImplementation(async () => USER2);

    const post = await postsUseCases.createPost(1, POST2);

    expect(post instanceof Post).toBeTruthy();
    expect(post).toStrictEqual(POST2);
  });

  it('Shoud throw an error if user is not found in createPost', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await postsUseCases.createPost(2, POST2);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The user {2} wasn't found.");
    }
  });
});
