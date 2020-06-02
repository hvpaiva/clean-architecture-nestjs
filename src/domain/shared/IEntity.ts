import { DomainException } from 'domain/exceptions/DomainException';
export interface IEntity {
  equals(entity: IEntity): boolean;
}
