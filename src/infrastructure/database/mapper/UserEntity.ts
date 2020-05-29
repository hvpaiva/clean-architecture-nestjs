import { EntitySchema } from "typeorm";

import { User } from 'domain/models/User';

import { BaseEntity } from "./BaseEntity";

export const UserEntity = new EntitySchema<User>({
  name: "users",
  columns: {
    ...BaseEntity,
    name: {
      type: String
    },
    email: {
      type: String
    }
  },
  relations: {
    posts: {
      type: "one-to-many",
      target: "posts"
    }
  },
  indices: [
    {
      name: "IDX_USERS",
      unique: true,
      columns: [
        "name",
        "email"
      ]
    }
  ],
  uniques: [
    {
      name: "UNIQUE_USERS",
      columns: [
        "email"
      ]
    }
  ]
});