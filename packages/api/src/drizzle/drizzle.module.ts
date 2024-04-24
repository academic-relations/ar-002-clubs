import { Module } from "@nestjs/common";
import { drizzleProvider } from "./drizzle.provider";
import { UserRepository } from "./repositories/user.repository";

@Module({
  providers: [...drizzleProvider, UserRepository],
  exports: [UserRepository],
})
export class DrizzleModule {}
