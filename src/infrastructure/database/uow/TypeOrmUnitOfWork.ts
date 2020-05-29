import { InjectConnection } from '@nestjs/typeorm';
import { Connection, QueryRunner, EntityManager } from 'typeorm';

import { IUnitOfWork } from 'application/ports/IUnitOfWork';

export class TypeOrmUnitOfWork implements IUnitOfWork {
  private readonly queryRunner: QueryRunner;
  private transactionManager: EntityManager;

  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.queryRunner = this.connection.createQueryRunner();
  }

  setTransactionManager() {
    this.transactionManager = this.queryRunner.manager;
  }

  async start() {
    await this.queryRunner.startTransaction();
    this.setTransactionManager();
  }

  getRepository<T>(R: new (transactionManager: EntityManager) => T): T {
    if (!this.transactionManager) {
      throw new Error('Unit of work is not started. Call the start() method');
    }
    return new R(this.transactionManager);
  }

  async commit(work: () => Promise<void>) {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }
}