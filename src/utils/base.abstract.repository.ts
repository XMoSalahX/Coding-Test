import {
  DeepPartial,
  DeleteResult,
  Entity,
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
    try {
      const doc = this.create(data);
      await this.save(doc);
      return doc;
    } catch (error) {
      console.error('Error creating entity:', error);
      throw new Error(`Failed to create entity: ${error}`);
    }
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
    criteria: string | number | Date | ObjectId | FindOptionsWhere<Entity> | string[] | number[] | Date[] | ObjectId[],
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
