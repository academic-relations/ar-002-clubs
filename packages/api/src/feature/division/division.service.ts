import { Injectable } from "@nestjs/common";

import DivisionRepository from "./division.repository";

import type { ApiDiv001ResponseOk } from "@sparcs-clubs/interface/api/division/apiDiv001";

@Injectable()
export default class DivisionService {
  constructor(private readonly divisionRepository: DivisionRepository) {}

  async getDivisions(): Promise<ApiDiv001ResponseOk> {
    const divisionsAndPresidents =
      await this.divisionRepository.selectDivisionsAndDivisionPresidents();

    return {
      divisions: divisionsAndPresidents
        .map(e => ({
          id: e.division.id,
          name: e.division.name,
          presidentStudentId: e.division_president_d.studentId,
        }))
        .sort((a, b) => a.id - b.id),
    };
  }
}
