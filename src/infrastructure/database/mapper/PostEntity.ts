import { EntitySchema } from 'typeorm';

import { Post } from 'domain/models/Post';

import { BaseEntity } from './BaseEntity';
import { User } from 'domain/models/User';
import { UserEntity } from './UserEntity';

export const PostEntity = new EntitySchema<Post>({
  name: 'Post',
  tableName: 'posts',
  target: Post,
  columns: {
    ...BaseEntity,
    title: {
      type: String,
      length: 50,
    },
    text: {
      type: String,
    },
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: () => User,
      joinColumn: true,
    },
  },
});
