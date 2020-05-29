export abstract class IUnitOfWork {
    abstract start(): void;
    abstract commit(work: () => Promise<void>): Promise<void>;
    abstract getRepository<T>(R: new (transactionManager: any) => T): T;
  }