import { Injectable } from '@nestjs/common';

import { Post } from 'domain/models/Post';

import { IRepository } from './IRepository';

@Injectable()
export abstract class IPostsRepository extends IRepository<Post> {}
