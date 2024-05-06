export interface UserTokenDto {
  id: number;
  sid: number;
  email: string;
  name: string;
  refreshToken: string;
}

export interface ProfileDto {
  id: number;
  sid: number;
  email: string;
  name: string;
}

export type UserProfileUpdateInput = {
  sid?: string;
  email?: string;
  name?: string;
  refreshToken?: string;
};

export type UserProfileCreateInput = {
  sid: string;
  email: string;
  name: string;
  refreshToken: string;
};
