import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { NoticeRepository } from "../repository/notice.repository";

import type { ApiNtc001ResponseOK } from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  async getNotices(pageOffset: number, itemCount: number) {
    const notices = await this.noticeRepository.getNoticePagination(
      pageOffset,
      itemCount,
    );

    if (!notices) {
      throw new HttpException(
        "[NoticeService] Error occurs while getting notices",
        HttpStatus.NOT_FOUND,
      );
    }

    const serviceResponse: ApiNtc001ResponseOK = {
      ...notices,
      notices: notices.notices.map(notice => ({
        date: notice.date,
        id: notice.id,
        title: notice.title,
        author: notice.author,
        link: notice.link,
      })),
    };

    return serviceResponse;
  }
}
