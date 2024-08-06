import { Injectable } from "@nestjs/common";

import { WsException } from "@nestjs/websockets";

import { MeetingRepository } from "./meeting.repository";

@Injectable()
export class MeetingService {
  constructor(private readonly meetingRepository: MeetingRepository) {}

  async entryMeeting(meetingId: number, userId: number) {
    const result = await this.meetingRepository.entryMeeting(meetingId, userId);
    if (!result) {
      throw new WsException("Failed to entry meeting");
    }
    return result;
  }

  async exitMeeting(meetingId: number, userId: number) {
    const result = await this.meetingRepository.exitMeeting(meetingId, userId);
    if (!result) {
      throw new WsException("Failed to exit meeting");
    }
    return result;
  }

  async vote(choiceId: number, userId: number) {
    const result = await this.meetingRepository.vote(choiceId, userId);
    if (!result) {
      throw new WsException("Failed to exit meeting");
    }
    return result;
  }
}
