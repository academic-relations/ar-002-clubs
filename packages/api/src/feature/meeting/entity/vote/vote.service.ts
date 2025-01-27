import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// import { WsException } from "@nestjs/websockets";

import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { VoteRepository } from "./vote.repository";

@Injectable()
export class VoteService {
  constructor(
    private readonly voteRepository: VoteRepository,
    private readonly userPublicService: UserPublicService,
  ) {}

  async postExecutiveMeetingAgendaVote(
    userId: number,
    meetingId: number,
    agendaId: number,
    title: string,
    description: string,
    choices: Array<{ id: number; choice: string }>,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.voteRepository.postMeetingAgendaVote(
      userId,
      meetingId,
      agendaId,
      title,
      description,
      choices,
    );
    if (!result) {
      throw new HttpException("Failed to create vote", HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async postExecutiveMeetingAgendaVoteResult(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    choiceId: number,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.voteRepository.postMeetingAgendaVoteResult(
      userId,
      meetingId,
      agendaId,
      voteId,
      choiceId,
    );
    if (!result) {
      throw new HttpException(
        "Failed to create vote result",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async putExecutiveMeetingAgendaVote(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    title: string,
    description: string,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.voteRepository.putMeetingAgendaVote(
      userId,
      meetingId,
      agendaId,
      voteId,
      title,
      description,
    );
    if (!result) {
      throw new HttpException("Failed to modify vote", HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async putExecutiveMeetingAgendaVoteChoices(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    choices: Array<{ id: number; choice: string }>,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.voteRepository.putMeetingAgendaVoteChoices(
      userId,
      meetingId,
      agendaId,
      voteId,
      choices,
    );
    if (!result) {
      throw new HttpException(
        "Failed to modify vote choices",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async putExecutiveMeetingAgendaVoteUserChoice(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    choiceId: number,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.voteRepository.putMeetingAgendaVoteUserChoice(
      userId,
      meetingId,
      agendaId,
      voteId,
      choiceId,
    );
    if (!result) {
      throw new HttpException(
        "Failed to modify user's vote choice",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async deleteExecutiveMeetingAgendaVote(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.voteRepository.deleteMeetingAgendaVote(
      userId,
      meetingId,
      agendaId,
      voteId,
    );
    if (!result) {
      throw new HttpException("Failed to delete vote", HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async deleteExecutiveMeetingAgendaVoteForUser(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.voteRepository.deleteMeetingAgendaVoteForUser(
      userId,
      meetingId,
      agendaId,
      voteId,
    );
    if (!result) {
      throw new HttpException(
        "Failed to delete vote for user",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  // CHACHA: 투표와 관련한 모든 정보 가져오기
  async getExecutiveMeetingAgendaVote(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.voteRepository.getMeetingAgendaVote(
      userId,
      meetingId,
      agendaId,
      voteId,
    );
    if (!result) {
      throw new HttpException("Failed get vote", HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
