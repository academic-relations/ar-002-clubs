import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { SocketGateway } from "./socket.gateway";
import { SocketRepository } from "./socket.repository";
import { SocketService } from "./socket.service";

@Module({
  imports: [DrizzleModule],
  providers: [SocketGateway, SocketService, SocketRepository],
})
export class SocketModule {}
