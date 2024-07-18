import { Logger } from "@nestjs/common";
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { env } from "@sparcs-clubs/api/env";

import { SocketService } from "./socket.service";

const corsOrigin = env.NODE_ENV === "development" ? "*" : ["*"]; // TODO: production일 경우에 도메인 제한 필요함.
@WebSocketGateway({ namespace: "socket", cors: corsOrigin })
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  private logger = new Logger(SocketGateway.name);

  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage("message")
  handleMessage(): void {
    this.server.emit("message", "Hello World!");
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
