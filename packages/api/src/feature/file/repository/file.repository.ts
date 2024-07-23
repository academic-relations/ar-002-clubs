import { Inject, Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { File } from "src/drizzle/schema/file.schema";

@Injectable()
export class FileRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async create(
    name: string,
    extension: string,
    size: number,
    signedAt: Date,
    userId: number,
  ) {
    await this.db.insert(File).values({
      name,
      extension,
      size,
      signedAt,
      userId,
    });
    const fileId = await this.db
      .select()
      .from(File)
      .where(
        and(
          eq(File.name, name),
          eq(File.signedAt, signedAt),
          eq(File.userId, userId),
        ),
      )
      .then(result => result);
    return fileId[0].id;
  }

  async findById(id: string) {
    const file = await this.db
      .select()
      .from(File)
      .where(eq(File.id, id))
      .then(result => result[0]);
    return file;
  }
}
