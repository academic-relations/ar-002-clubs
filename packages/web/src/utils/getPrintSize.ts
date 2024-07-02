import { PromotionalPrintingSizeEnum } from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";

const getPrintSize = (type: PromotionalPrintingSizeEnum): string => {
  switch (type) {
    case 1:
      return "A4";
    case 2:
      return "A3";
    default:
      return "None";
  }
};

export default getPrintSize;
