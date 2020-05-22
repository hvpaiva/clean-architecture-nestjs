import { EntitySchema } from "typeorm";

import { Post } from 'domain/Post';
import { BaseEntity } from "./BaseEntity";

export const PostEntity = new EntitySchema<Post>({
  name: "posts",
  columns: {
    ...BaseEntity,
    title: {
      type: String
    },
    text: {
      type: String
    }
  }
});