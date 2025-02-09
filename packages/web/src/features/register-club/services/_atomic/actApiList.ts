import apiAct002 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";
import apiAct011 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";
import apiAct012 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct012";
import apiAct013 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct013";
import apiAct014 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct014";
import apiAct015 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct015";
import { UserTypeEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

const activitiesGet = (profile: string) => {
  if (profile === "professor") {
    return apiAct013.url();
  }
  if (profile === UserTypeEnum.Executive) {
    return apiAct012.url();
  }
  return apiAct011.url();
};

const activityDetailGet = (profile: string, id: number) => {
  if (profile === "professor") {
    return apiAct015.url(id);
  }
  if (profile === UserTypeEnum.Executive) {
    return apiAct014.url(id);
  }
  return apiAct002.url(id);
};

export { activitiesGet, activityDetailGet };
