import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // Patch,
  Post,
  Put,
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

import apiMee022, {
  ApiMee022RequestParam,
  ApiMee022ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee022";

import apiMee023, {
  ApiMee023RequestParam,
  ApiMee023ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee023";

import apiMee024, {
  ApiMee024RequestParam,
  ApiMee024ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee024";

import apiMee025, {
  ApiMee025RequestParam,
  ApiMee025ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee025";

import apiMee026, {
  ApiMee026RequestParam,
  ApiMee026ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee026";

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
  @Put(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  )
  @UsePipes(new ZodPipe(apiMee018))
  async putExecutiveMeetingAgendaVote(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee018RequestParam,
    @Body() { title, description }: ApiMee018RequestBody,
  ): Promise<ApiMee018ResponseOk> {
    const result = await this.voteService.putExecutiveMeetingAgendaVote(
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
  @Put(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  )
  @UsePipes(new ZodPipe(apiMee019))
  async putExecutiveMeetingAgendaVoteChoices(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee019RequestParam,
    @Body() { choices }: ApiMee019RequestBody,
  ): Promise<ApiMee019ResponseOk> {
    const result = await this.voteService.putExecutiveMeetingAgendaVoteChoices(
      user.executiveId,
      meetingId,
      agendaId,
      voteId,
      choices,
    );

    return result;
  }

  @Executive()
  @Put(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  )
  @UsePipes(new ZodPipe(apiMee020))
  async putExecutiveMeetingAgendaVoteUserChoice(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee020RequestParam,
    @Body() { choiceId }: ApiMee020RequestBody,
  ): Promise<ApiMee020ResponseOk> {
    const result =
      await this.voteService.putExecutiveMeetingAgendaVoteUserChoice(
        user.executiveId,
        meetingId,
        agendaId,
        voteId,
        choiceId,
      );

    return result;
  }

  @Executive()
  @Delete(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  )
  @UsePipes(new ZodPipe(apiMee022))
  async deleteExecutiveMeetingAgendaVote(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee022RequestParam,
  ): Promise<ApiMee022ResponseOk> {
    const result = await this.voteService.deleteExecutiveMeetingAgendaVote(
      user.executiveId,
      meetingId,
      agendaId,
      voteId,
    );

    return result;
  }

  @Executive()
  @Delete(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId/users",
  )
  @UsePipes(new ZodPipe(apiMee023))
  async deleteExecutiveMeetingAgendaVoteForUser(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee023RequestParam,
  ): Promise<ApiMee023ResponseOk> {
    const result =
      await this.voteService.deleteExecutiveMeetingAgendaVoteForUser(
        user.executiveId,
        meetingId,
        agendaId,
        voteId,
      );

    return result;
  }

  @Executive()
  @Get(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId",
  )
  @UsePipes(new ZodPipe(apiMee024))
  async getExecutiveMeetingAgendaVote(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee024RequestParam,
  ): Promise<ApiMee024ResponseOk> {
    const result = await this.voteService.getExecutiveMeetingAgendaVote(
      user.executiveId,
      meetingId,
      agendaId,
      voteId,
    );

    return result;
  }

  @Executive()
  @Get(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId/results",
  )
  @UsePipes(new ZodPipe(apiMee025))
  async getExecutiveMeetingAgendaVoteWithResults(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee025RequestParam,
  ): Promise<ApiMee025ResponseOk> {
    const result =
      await this.voteService.getExecutiveMeetingAgendaVoteWithResults(
        user.executiveId,
        meetingId,
        agendaId,
        voteId,
      );

    return result;
  }

  @Executive()
  @Get(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/votes/vote/:voteId/results/final",
  )
  @UsePipes(new ZodPipe(apiMee026))
  async getExecutiveMeetingAgendaVoteFinal(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId, voteId }: ApiMee026RequestParam,
  ): Promise<ApiMee026ResponseOk> {
    const result = await this.voteService.getExecutiveMeetingAgendaVoteFinal(
      user.executiveId,
      meetingId,
      agendaId,
      voteId,
    );

    return result;
  }
}
