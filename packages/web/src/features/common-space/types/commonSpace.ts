// export interface CommonSpaceInterface {
//   agreement: boolean;
//   info?: {
//     clubName: string;
//     applicant: string;
//     phone: string;
//   };
//   space?: string;
//   reservation?: {
//     start: Date;
//     end: Date;
//   };
// }

import {
  ApiCms003RequestBody,
  ApiCms003RequestParam,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms003";

export interface CommonSpaceInterface {
  agreement: boolean;
  userInfo?: {
    clubName: string;
    name: string;
    phoneNumber: string;
  };
  spaceName?: string;
  body: Partial<ApiCms003RequestBody>;
  param: Partial<ApiCms003RequestParam>;
}

// {
//   spaceId: number;
// }

// {
//   email: string;
//   startTerm: Date;
//   endTerm: Date;
//   clubId: number;
// }
