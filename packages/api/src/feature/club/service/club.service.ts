import { Injectable } from "@nestjs/common";
import { ClubRepository } from "../repository/club.getclubs.repository";

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}

  async getClubs() {
    // todo: return type 추가하기 : Promise<ApiClb001ResponseOK>
    const record = await this.clubRepository.getAllClubs();
    const result = {
      divisions: Object.values(record),
    };
    return result;
  }
}
