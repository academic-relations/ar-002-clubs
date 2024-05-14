import { Injectable } from "@nestjs/common";
import { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import { ClubRepository } from "../repository/club.repository";

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}

  async getClubs(): Promise<ApiClb001ResponseOK> {
    const result = await this.clubRepository.getAllClubs();
    return result;
  }
}
