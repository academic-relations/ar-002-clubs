import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import axios from "axios";
import * as cheerio from "cheerio";

import logger from "@sparcs-clubs/api/common/util/logger";

import { NoticeRepository } from "../repository/notice.repository";

import type { ApiNtc001ResponseOK } from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";
import type {
  ApiNtc003RequestBody,
  ApiNtc003ResponseCreated,
} from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc003";
import type { ApiNtc004ResponseCreated } from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc004";

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

  async postNotices(
    body: ApiNtc003RequestBody,
  ): Promise<ApiNtc003ResponseCreated> {
    const isInsertionSucceed = await this.noticeRepository.insertNotices([
      {
        title: body.title,
        author: body.author,
        date: body.date,
        link: body.link,
      },
    ]);

    if (!isInsertionSucceed)
      throw new HttpException(
        "Failed to insert",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return {};
  }

  async postNoticesCrawling(): Promise<ApiNtc004ResponseCreated> {
    const baseUrl = "https://cafe.naver.com/kaistclubs";
    const iframeUrl = "/ArticleList.nhn";
    const queryParams =
      "search.clubid=26985838%26search.menuid=1%26search.boardtype=L";

    const commonUrl = `${baseUrl}?iframe_url=${iframeUrl}%3F${queryParams}`;

    let page = 1;

    const notices = [];

    while (page === 1) {
      logger.debug(`[/notices/update] page:${page}`);
      // 1000은 무한루프 방지용으로 넣은 충분히 큰 숫자
      const fullUrl = `${commonUrl}%26search.page=${page}`;

      // eslint-disable-next-line no-await-in-loop
      const { data } = await axios.get(fullUrl);

      const $ = cheerio.load(data);

      logger.debug(`[/notices/update] link:${fullUrl}`);

      const articles = $(".article").get();
      // .map((el, _i)=>$(el).text())

      // <a> 태그 중 class가 'article'인 요소의 href 추출
      const links = $("a.article")
        .get()
        .map((el, _i) => $(el).attr("href"));

      // const regex =
      //   /<a[^>]*class=["']?[^"'>]*article[^"'>]*["']?[^>]*href=["']([^"']+)["'][^>]*>/g;

      // regex.exec(html);

      // <a> 태그 중 class가 'n-tcol-c'인 요소 추출
      const authors = $("a.n-tcol-c").text();

      // <td> 태그 중 class가 'td_date'인 요소 추출
      const dates = $("td.td_date").text();

      for (let i = 0; i < articles.length; i += 1) {
        notices.push({
          title: articles[i],
          author: authors[i],
          date: dates[i],
          link: links[i],
        });
      }
      page += 1;

      logger.debug(`[/notices/update] articles:${articles.length}`);
    }

    // const isInsertionSucceed = await this.noticeRepository.insertNotices(notices);

    // if (!isInsertionSucceed)
    //   throw new HttpException(
    //     "Failed to insert",
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );

    return {};
  }
}
