import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindConditions,
  ObjectID,
  FindOneOptions,
  DeepPartial,
  SaveOptions,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class IRepository<Entity> {
  abstract find(options?: FindManyOptions<Entity>): Promise<Entity[]>;

  abstract find(conditions?: FindConditions<Entity>): Promise<Entity[]>;

  abstract findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>;

  abstract findOne(
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>;

  abstract findOne(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>;

  abstract save<T extends DeepPartial<Entity>>(
    entities: T[],
    options: SaveOptions & {
      reload: false;
    },
  ): Promise<T[]>;

  abstract save<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]>;

  abstract save<T extends DeepPartial<Entity>>(
    entity: T,
    options: SaveOptions & {
      reload: false;
    },
  ): Promise<T>;

  abstract save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>;

  abstract update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult>;

  abstract delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
  ): Promise<DeleteResult>;

  abstract transaction<T>(operation: () => Promise<T>): Promise<T>;
}
