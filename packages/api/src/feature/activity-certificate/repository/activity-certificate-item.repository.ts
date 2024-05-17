// import { Inject, Injectable } from "@nestjs/common";
// import { MySql2Database } from "drizzle-orm/mysql2";
// import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
// import { ActivityCertificateItem } from "src/drizzle/schema/activity-certificate.schema";

// @Injectable()
// export class ActivityCertificateItemRepository {
//   constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

//   async create({ items }: { items: string[] }) {
//     await this.db.insert(ActivityCertificateItem).values({
//       activityCertificateId: 1,
//       order: 1,
//       items,
//     });
//   }
// }
