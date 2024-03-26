import { PrismaService } from "src/prisma/prisma.service";

export class ClubsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getClubs() {
    return "test";
  }
}
