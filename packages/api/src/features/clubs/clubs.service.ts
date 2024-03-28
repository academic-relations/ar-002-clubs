import { Injectable } from "@nestjs/common";
import { ClubsRepository } from "@sparcs-clubs/api/prisma/repositories/clubs.repository";

@Injectable()
export class ClubsService {
  constructor(private readonly clubsRepository: ClubsRepository) {}

  async getClubs() {
    await this.clubsRepository.getClubs();
    return 1;
  }
}
