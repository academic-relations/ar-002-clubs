import { Injectable } from "@nestjs/common";

import { SocketRepository } from "./socket.repository";

@Injectable()
export class SocketService {
  constructor(private readonly chatRepository: SocketRepository) {}
}
