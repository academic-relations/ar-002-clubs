import { UserDto } from "@sparcs-clubs/api/common/dto/user.dto";
import { Request as _Request, Response as _Response } from "express";

export type Request = _Request & RequestExtra;

export interface RequestExtra {
  session: {
    next: string;
    ssoState: string;
  };
  user: UserDto;
}

export interface Response extends _Response {}

export interface JwtPayload {
  sid: string;
  role: string;
}
