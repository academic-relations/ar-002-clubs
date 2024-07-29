import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ApiFnd001RequestBody } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd001";
import { ApiFnd002RequestParam } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd002";
import {
  ApiFnd003RequestBody,
  ApiFnd003RequestParam,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd003";

import UserRepository from "@sparcs-clubs/api/feature/user/repository/user.repository";

import FundingRepository from "../repository/funding.repository";

@Injectable()
export default class FundingService {
  constructor(
    private fundingRepository: FundingRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async postStudentFunding(body: ApiFnd001RequestBody, studentId: number) {
    const user = await this.userRepository.findStudentById(studentId);
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    return this.fundingRepository.insertFunding(body);
  }

  async getStudentFunding(param: ApiFnd002RequestParam, studentId: number) {
    const user = await this.userRepository.findStudentById(studentId);
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    return this.fundingRepository.selectFundingByFundingId(param.id);
  }

  async putStudentFunding(
    body: ApiFnd003RequestBody,
    param: ApiFnd003RequestParam,
    studentId: number,
  ) {
    const user = await this.userRepository.findStudentById(studentId);
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    return this.fundingRepository.putStudentFunding(body, param.id);
  }
}
