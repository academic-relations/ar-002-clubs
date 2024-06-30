interface UserRefreshToken {
  id: number;
  sid: string;
  name: string;
  emial: string;
}

interface UserAccesstoken {
  id: number;
  sid: string;
  name: string;
  emial: string;
  studentId?: number;
  studentNumber?: number;
  executiveId?: number;
}

export interface UserRefreshTokenPayload {
  user: Pick<UserRefreshToken, "id" | "sid" | "name" | "emial">;
}

export interface UserAccessTokenPayload {
  user: Pick<
    UserAccesstoken,
    | "id"
    | "sid"
    | "name"
    | "emial"
    | "executiveId"
    | "studentId"
    | "studentNumber"
  >;
}
