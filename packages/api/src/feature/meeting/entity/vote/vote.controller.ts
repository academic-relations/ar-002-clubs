import {
  Controller,
  // Get, Query, UsePipes
} from "@nestjs/common";

import { VoteService } from "./vote.service";

// import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
// import { Executive } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
// import { GetExecutive } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

@Controller()
export default class VoteController {
  constructor(private entityService: VoteService) {}

  // @Executive()
  // @Get()
  // @UsePipes()
  // async getMeetingNextDegree(
  //   @GetExecutive() user: GetExecutive,
  //   @Query() query: ApiMee005RequestQuery,
  // ): Promise<ApiMee005ResponseOk> {
  //   const degree = await this.meetingService.getExecutiveMeetingNextDegree(
  //     query,
  //     user.executiveId,
  //   );

  //   return { degree };
  // }
}
