import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ColumnBaseConfig, ColumnDataType, eq, inArray } from "drizzle-orm";
import { MySqlColumn, MySqlTable } from "drizzle-orm/mysql-core";
import { MySql2Database } from "drizzle-orm/mysql2";

import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "@sparcs-clubs/api/drizzle/drizzle.provider";

import { MEntity } from "../model/entity.model";
import { getKSTDate } from "../util/util";

interface TableWithId {
  id: MySqlColumn<ColumnBaseConfig<ColumnDataType, string>>;
}

interface ModelWithFrom<T extends MEntity, D> {
  from(result: D): T;
}

@Injectable()
export abstract class BaseRepository<
  M extends MEntity,
  R,
  D,
  T extends MySqlTable & TableWithId,
> {
  @Inject(DrizzleAsyncProvider) private db: MySql2Database;

  constructor(
    protected table: T,
    protected modelClass: ModelWithFrom<M, D>,
  ) {}

  async withTransaction<Result>(
    callback: (tx: DrizzleTransaction) => Promise<Result>,
  ): Promise<Result> {
    return this.db.transaction(callback);
  }

  async findTx(tx: DrizzleTransaction, id: number): Promise<M | null> {
    const result = await tx
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .then(rows => rows.map(row => this.modelClass.from(row as D)));

    return (result[0] as M) ?? null;
  }

  async find(id: number): Promise<M | null> {
    return this.withTransaction(async tx => this.findTx(tx, id));
  }

  async fetchTx(tx: DrizzleTransaction, id: number): Promise<M> {
    const result = await this.findTx(tx, id);
    if (result === null) {
      throw new NotFoundException(`Not found: ${this.table} with id: ${id}`);
    }
    return result;
  }

  async fetch(id: number): Promise<M> {
    return this.withTransaction(async tx => this.fetchTx(tx, id));
  }

  async fetchAllTx(tx: DrizzleTransaction, ids: number[]): Promise<M[]> {
    if (ids.length === 0) {
      return [];
    }

    const result = await tx
      .select()
      .from(this.table)
      .where(inArray(this.table.id, ids));

    return result.map(row => this.modelClass.from(row as D));
  }

  async fetchAll(ids: number[]): Promise<M[]> {
    return this.withTransaction(async tx => this.fetchAllTx(tx, ids));
  }

  async insertTx(tx: DrizzleTransaction, param: R): Promise<M> {
    const [result] = await tx.insert(this.table).values(param).execute();

    const newId = Number(result.insertId);

    return this.fetchTx(tx, newId);
  }

  async insert(param: R): Promise<M> {
    return this.withTransaction(async tx => this.insertTx(tx, param));
  }

  async putTx(tx: DrizzleTransaction, id: number, param: R): Promise<M> {
    await tx
      .update(this.table)
      .set(param)
      .where(eq(this.table.id, id))
      .execute();
    return this.fetchTx(tx, id);
  }

  async put(id: number, param: R): Promise<M> {
    return this.withTransaction(async tx => this.putTx(tx, id, param));
  }

  async patchTx(
    tx: DrizzleTransaction,
    oldbie: M,
    consumer: (oldbie: M) => M,
  ): Promise<M> {
    const param = consumer(oldbie);
    await tx
      .update(this.table)
      .set(param)
      .where(eq(this.table.id, oldbie.id))
      .execute();

    return this.fetchTx(tx, oldbie.id);
  }

  async patch(oldbie: M, consumer: (oldbie: M) => M): Promise<M> {
    return this.withTransaction(async tx => this.patchTx(tx, oldbie, consumer));
  }

  async deleteTx(tx: DrizzleTransaction, id: number): Promise<void> {
    await tx
      .update(this.table)
      .set({ deletedAt: getKSTDate() })
      .where(eq(this.table.id, id))
      .execute();
  }

  async delete(id: number): Promise<void> {
    return this.withTransaction(async tx => this.deleteTx(tx, id));
  }
}
