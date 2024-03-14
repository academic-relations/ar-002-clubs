import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { prismaConfig } from "@sparcs-clubs/api/env";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const ormOption = prismaConfig;
    super(ormOption);
  }

  async onModuleInit() {
    await this.$connect();
    // @ts-expect-error-next-line
    this.$on("query", async _ => {
      // console.log(`Query: ${e.query} ${e.params}`);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
