import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import type { ApiNtc001ResponseOK } from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";

import { NoticesRepository } from "../repository/notices.repository";

@Injectable()
export class NoticesService {
  constructor(private readonly noticesRepository: NoticesRepository) {}

  async notices(pageOffset: number, itemCount: number) {
    const notices = await this.noticesRepository.notices(pageOffset, itemCount);

    if (!notices) {
      throw new HttpException(
        "[NoticeService] Error occurs while getting notices",
        HttpStatus.NOT_FOUND,
      );
    }

    const seriveResponse: ApiNtc001ResponseOK = {
      ...notices,
      notices: notices.notices.map(notice => ({
        date: notice.date,
        id: notice.id,
        title: notice.title,
        author: notice.author,
        link: notice.link,
      })),
    };

    return seriveResponse;
  }
}
