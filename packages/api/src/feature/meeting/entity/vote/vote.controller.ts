import {
  Body,
  Controller,
  // Delete,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";

import apiMee016, {
  ApiMee016RequestBody,
  ApiMee016RequestParam,
  ApiMee016ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee016";

import apiMee017, {
  ApiMee017RequestBody,
  ApiMee017RequestParam,
  ApiMee017ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee017";

import apiMee018, {
  ApiMee018RequestBody,
  ApiMee018RequestParam,
  ApiMee018ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee018";

import apiMee019, {
  ApiMee019RequestBody,
  ApiMee019RequestParam,
  ApiMee019ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee019";

import apiMee020, {
  ApiMee020RequestBody,
  ApiMee020RequestParam,
  ApiMee020ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee020";

// import apiMee021, {
//   ApiMee021RequestBody,
//   ApiMee021RequestParam,
//   ApiMee021ResponseOk,
// } from "@sparcs-clubs/interface/api/meeting/apiMee021";

// import apiMee022, {
//   ApiMee022RequestParam,
//   ApiMee022ResponseOk,
// } from "@sparcs-clubs/interface/api/meeting/apiMee022";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { Executive } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetExecutive } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { VoteService } from "./vote.service";

@Controller()
export default class VoteController {
  constructor(private voteService: VoteService) {}

  @Executive()
  @Post(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote",
  )
  @UsePipes(new ZodPipe(apiMee016))
  async postExecutiveMeetingAgendaVote(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId }: ApiMee016RequestParam,
    @Body() { title, description, choices }: ApiMee016RequestBody,
  ): Promise<ApiMee016ResponseOk> {
    const result = await this.voteService.postExecutiveMeetingAgendaVote(
      user.executiveId,
      meetingId,
      agendaId,
      title,
      description,
      choices,
    );

    return result;
  }

  @Executive()
  @Post(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  )
  @UsePipes(new ZodPipe(apiMee017))
  async postExecutiveMeetingAgendaVoteResult(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee017RequestParam,
    @Body() { choiceId }: ApiMee017RequestBody,
  ): Promise<ApiMee017ResponseOk> {
    const result = await this.voteService.postExecutiveMeetingAgendaVoteResult(
      user.executiveId,
      meetingId,
      agendaId,
      voteId,
      choiceId,
    );

    return result;
  }

  @Executive()
  @Patch(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  )
  @UsePipes(new ZodPipe(apiMee018))
  async patchExecutiveMeetingAgendaVote(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee018RequestParam,
    @Body() { title, description }: ApiMee018RequestBody,
  ): Promise<ApiMee018ResponseOk> {
    const result = await this.voteService.patchExecutiveMeetingAgendaVote(
      user.executiveId,
      meetingId,
      agendaId,
      voteId,
      title,
      description,
    );

    return result;
  }

  @Executive()
  @Patch(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  )
  @UsePipes(new ZodPipe(apiMee019))
  async patchExecutiveMeetingAgendaVoteChoices(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee019RequestParam,
    @Body() { choices }: ApiMee019RequestBody,
  ): Promise<ApiMee019ResponseOk> {
    const result =
      await this.voteService.patchExecutiveMeetingAgendaVoteChoices(
        user.executiveId,
        meetingId,
        agendaId,
        voteId,
        choices,
      );

    return result;
  }

  @Executive()
  @Patch(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  )
  @UsePipes(new ZodPipe(apiMee020))
  async patchExecutiveMeetingAgendaVoteUserChoice(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee020RequestParam,
    @Body() { choiceId }: ApiMee020RequestBody,
  ): Promise<ApiMee020ResponseOk> {
    const result =
      await this.voteService.patchExecutiveMeetingAgendaVoteUserChoice(
        user.executiveId,
        meetingId,
        agendaId,
        voteId,
        choiceId,
      );

    return result;
  }

  // @Executive()
  // @Patch(
  //   "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/entities",
  // )
  // @UsePipes(new ZodPipe(apiMee021))
  // async patchExecutiveMeetingAgendaEntities(
  //   @GetExecutive() user: GetExecutive,
  //   @Param() { meetingId, agendaId }: ApiMee021RequestParam,
  //   @Body() { entityIdList }: ApiMee021RequestBody,
  // ): Promise<ApiMee021ResponseOk> {
  //   const result = await this.voteService.patchExecutiveMeetingAgendaEntities(
  //     user.executiveId,
  //     meetingId,
  //     agendaId,
  //     entityIdList,
  //   );

  //   return result;
  // }

  // @Executive()
  // @Delete(
  //   "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  // )
  // @UsePipes(new ZodPipe(apiMee022))
  // async deleteExecutiveMeetingAgendaVote(
  //   @GetExecutive() user: GetExecutive,
  //   @Param() { meetingId, agendaId, voteId }: ApiMee022RequestParam,
  // ): Promise<ApiMee022ResponseOk> {
  //   const result = await this.voteService.deleteExecutiveMeetingAgendaVote(
  //     user.executiveId,
  //     meetingId,
  //     agendaId,
  //     voteId,
  //   );

  //   return result;
  // }
}
