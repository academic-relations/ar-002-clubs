import apiFnd002 from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd002";
import apiFnd012 from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd012";
import { UserTypeEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

const fundingDetailGet = (profile: string, id: number) => {
  if (profile === UserTypeEnum.Executive) {
    return apiFnd012.url(id);
  }
  return apiFnd002.url(id);
};

export { fundingDetailGet };
