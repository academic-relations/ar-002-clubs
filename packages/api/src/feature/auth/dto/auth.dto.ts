import { Request as _Request } from "express";

interface User {
  id: number;
  sid: string;
  name: string;
  email: string;
  studentId?: number;
  studentNumber?: string;
  executiveId?: number;
}

export interface UserRefreshTokenPayload {
  user: Pick<User, "id" | "sid" | "name" | "email">;
}

export interface UserAccessTokenPayload {
  user: User;
}

export type Request = _Request & RequestExtra;
export interface RequestExtra {
  session: {
    next: string;
    ssoState: string;
  };
}
