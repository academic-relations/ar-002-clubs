interface User {
  id: number;
  sid: string;
  name: string;
  email: string;
  studentId?: number;
  studentNumber?: number;
  executiveId?: number;
}

export interface UserRefreshTokenPayload {
  user: Pick<User, "id" | "sid" | "name" | "email">;
}

export interface UserAccessTokenPayload {
  user: User;
}
