import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { IPostsRepository } from 'application/ports/IPostsRepository';
import { Post } from 'domain/models/Post';
import { PostEntity } from 'infrastructure/database/mapper/PostEntity';

import { BaseRepository } from './BaseRepository';

@Injectable()
export class PostsRepository extends BaseRepository<Post>
  implements IPostsRepository {
  constructor(@InjectConnection() connection: Connection) {
    super(connection, PostEntity);
  }
}
