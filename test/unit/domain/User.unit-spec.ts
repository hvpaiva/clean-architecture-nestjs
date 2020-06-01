import { User } from 'domain/models/User';
import { Post } from 'domain/models/Post';
import { DomainException } from 'domain/exceptions/DomainException';

describe('User tests', () => {
  let USER_MOCK: User;
  const USER_OBJECT = { name: 'John Doe', email: 'john.doe@gmail.com' };

  let POST_MOCK: Post;
  const POST_OBJECT = { id: 1, title: 'Title', text: 'Text', user: null };

  beforeEach(() => {
    POST_MOCK = new Post('Title', 'Text', null, 1);
    USER_MOCK = new User('John Doe', 'john.doe@gmail.com', null, 1);
  });

  it('Should create an user', () => {
    const user = new User('John Doe', 'john.doe@gmail.com');

    expect(user instanceof User).toBeTruthy();
    expect(user).toEqual(USER_OBJECT);
  });

  it('Should create a post', () => {
    const addicionalPost = new Post('Title2', 'Text2');

    USER_MOCK.createPost(POST_MOCK);
    USER_MOCK.createPost(addicionalPost);

    expect(USER_MOCK.posts).toHaveLength(2);
    expect(USER_MOCK.posts).toEqual([POST_OBJECT, addicionalPost]);
  });

  it('Should throw exception if a post with same name is created', () => {
    expect(() => {
      USER_MOCK.createPost(POST_MOCK);
      USER_MOCK.createPost(POST_MOCK);
    }).toThrow(DomainException);
  });

  it('Should find a post', () => {
    USER_MOCK.createPost(POST_MOCK);

    const post = USER_MOCK.findPost(POST_MOCK.id);

    expect(post).toEqual(POST_OBJECT);
  });

  it('Should not find a post', () => {
    const notFound = USER_MOCK.findPost(99);

    expect(notFound).toEqual(null);
  });
});
