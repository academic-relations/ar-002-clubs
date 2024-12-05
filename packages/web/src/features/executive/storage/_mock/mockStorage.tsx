import { ApiSto012ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto012";

const items = Array.from({ length: 120 }, (_, index) => ({
  applicationId: index + 1,
  clubNameKr: "술박스",
  clubNameEn: "clubNameEnPlaceHolder",
  studentName: "일재환",
  studentPhoneNumber: "010-0239-1858",
  desiredStartDate: new Date(),
  desiredEndDate: new Date(),
  numberOfBoxes: 12,
  numberOfNonStandardItems: 5,
  status: "applied",
  createdAt: new Date(),
}));

const mockupStorage: ApiSto012ResponseOk = {
  items,
  total: items.length,
  offset: 1,
};

export default mockupStorage;
