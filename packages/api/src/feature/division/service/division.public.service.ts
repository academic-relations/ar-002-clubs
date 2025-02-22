import { Injectable } from "@nestjs/common";

import DivisionRepository from "../repository/division.repository";

@Injectable()
export default class DivisionPublicService {
  constructor(private readonly divisionRepository: DivisionRepository) {}

  async findDivisionById(id: number) {
    const result = await this.divisionRepository.findDivisionById(id);
    return result;
  }

  async getDivisionById(param: { id: number }) {
    const result = await this.divisionRepository.selectDivisionById(param);
    return result;
  }
}
