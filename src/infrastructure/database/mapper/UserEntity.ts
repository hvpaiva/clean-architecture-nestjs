import { EntitySchema } from 'typeorm';

import { User } from 'domain/models/User';

import { BaseEntity } from './BaseEntity';
import { Post } from 'domain/models/Post';

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    ...BaseEntity,
    name: {
      type: String,
      length: 100,
    },
    email: {
      type: String,
      length: 100,
    },
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {
    posts: {
      type: 'one-to-many',
      target: () => Post,
      cascade: ['insert', 'update'],
      onDelete: 'CASCADE',
      inverseSide: 'user',
    },
  },
  indices: [
    {
      name: 'IDX_USERS',
      unique: true,
      columns: ['name', 'email'],
    },
  ],
  uniques: [
    {
      name: 'UNIQUE_USERS',
      columns: ['email'],
    },
  ],
});
