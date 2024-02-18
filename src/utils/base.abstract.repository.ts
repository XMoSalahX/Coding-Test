import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseAbstractRepository<Entity> extends Repository<Entity> {
  public async createBase(data: DeepPartial<Entity>): Promise<Entity> {
    console.log(this);
    const doc = await this.create(data);
    await this.save(doc);
    return doc;
  }
  public async findOneBase(
    conditions?: FindOneOptions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined> {
    const doc = await this.findOne(conditions);
    return doc;
  }
  public async deleteBase(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<Entity>,
  ): Promise<DeleteResult> {
    return await this.delete(criteria);
  }
  public async updateBase(
    criteria: string | string[] | number | number[] | Date | Date[] | any | any[] | FindOneOptions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return await this.update(criteria, partialEntity);
  }
  public async findAllWithOptions(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return await this.find(options);
  }
  public async findAllWithConditions(conditions?: FindOneOptions<Entity>): Promise<Entity[]> {
    return await this.find(conditions);
  }
}
