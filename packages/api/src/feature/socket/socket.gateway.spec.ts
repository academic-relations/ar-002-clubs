import { Test, TestingModule } from "@nestjs/testing";

import { SocketGateway } from "./socket.gateway";

describe("SocketGateway", () => {
  let gateway: SocketGateway;

  // before all test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketGateway],
    }).compile();

    gateway = module.get<SocketGateway>(SocketGateway);
  });

  it("should be defined", () => {
    expect(gateway);
  });
});
