import { Test } from '@nestjs/testing';
import { PostsController } from 'presentation/controllers/PostsController';
import { PostsUseCases } from 'application/use-cases/PostsUseCases';
import { Post } from 'domain/models/Post';
import { PostVM } from 'presentation/view-models/posts/PostVM';

describe('PostsController Test', () => {
  let postsController: PostsController;
  let postsUseCases: PostsUseCases;

  const POST = new Post('Title', 'Text', null, 1);
  POST.createdAt = new Date('2020-05-31 02:20:58.037572-03');
  POST.updatedAt = new Date('2020-05-31 02:20:58.037572-03');

  const POST_VM = {
    id: 1,
    title: 'Title',
    text: 'Text',
    createdAt: new Date('2020-05-31 02:20:58.037572-03'),
    updatedAt: new Date('2020-05-31 02:20:58.037572-03'),
  } as PostVM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostsController,
        {
          provide: PostsUseCases,
          useFactory: () => ({
            getAllPostsByUser: jest.fn(() => true),
            getPostByUser: jest.fn(() => true),
            createPost: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    postsUseCases = module.get<PostsUseCases>(PostsUseCases);
    postsController = module.get<PostsController>(PostsController);
  });

  it('should return a list of PostVM when get a valid user with posts in GET /users/:userId/posts', async () => {
    jest
      .spyOn(postsUseCases, 'getAllPostsByUser')
      .mockImplementation(async () => [POST]);

    const postsVM = await postsController.getPostsByUser('1');

    expect(postsVM).toHaveLength(1);
    expect(postsVM).toEqual([POST_VM]);
  });

  it('should return the PostVM when get a valid posts of a valid user in GET /users/:userId/posts/:postId', async () => {
    jest
      .spyOn(postsUseCases, 'getPostByUser')
      .mockImplementation(async () => POST);

    const postVM = await postsController.getPost('1', '1');

    expect(postVM instanceof PostVM).toBeTruthy();
    expect(postVM).toEqual(POST_VM);
  });

  it('should return a PostVM when creating a post in POST /users/:userId/posts', async () => {
    jest
      .spyOn(postsUseCases, 'createPost')
      .mockImplementation(async () => POST);

    const postVM = await postsController.createPost('1', POST);

    expect(postVM instanceof PostVM).toBeTruthy();
    expect(postVM).toEqual(POST_VM);
  });
});
