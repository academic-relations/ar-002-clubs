import { Club, Representative } from "./club.dto";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface _UserDto {
  id: number;
  sid: string;
  email: string;
  phoneNumber: string;
  name: string;
  refreshToken: string;
}

export interface UserDto extends _UserDto {
  // stduent
  studentId?: number; // executive
  studentNumber?: number;
  department?: string;
  clubs?: Club[];
  representative?: Representative;

  // executive
  executiveStatusEnum?: number;
  executiveBureauEnum?: number;
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
