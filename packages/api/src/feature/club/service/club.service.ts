import { Injectable } from "@nestjs/common";
import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";

@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}

  // async findAllClubsByStudent(user: ProfileDto) {
  //   const clubs = await this.clubRepository.findAllClubsBySemester(
  //     user.studentId,
  //   );
  //   if (!clubs) {
  //     throw new HttpException("Student Doesn't exist", HttpStatus.NOT_FOUND);
  //   }
  //   return clubs;
  // }
}
