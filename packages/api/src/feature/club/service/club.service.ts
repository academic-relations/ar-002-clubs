import { Injectable } from "@nestjs/common";
import { ClubRepository, IClubs } from "../repository/club.endpoint.repository";

export interface IClubsWithDivisions {
  divisions: IClubs[];
}
@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}

  async getAllClubs(): Promise<IClubsWithDivisions> {
    const record = await this.clubRepository.getAllClubs();
    const result = {
      divisions: Object.values(record),
    };
    return result;
  }
}
