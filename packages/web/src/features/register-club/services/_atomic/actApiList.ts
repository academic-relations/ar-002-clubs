import apiAct011 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";
import apiAct012 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct012";
import apiAct013 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct013";

const activitiesGet = (profile: string) => {
  if (profile === "professor") {
    return apiAct013.url();
  }
  if (profile === "executive") {
    return apiAct012.url();
  }
  return apiAct011.url();
};

export default activitiesGet;
