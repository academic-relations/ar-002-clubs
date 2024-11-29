import { StorageStatusEnum } from "@sparcs-clubs/interface/common/enum/storage.enum";

const getEnumStorage = (string: string): StorageStatusEnum => {
  switch (string) {
    case "Applied":
      return StorageStatusEnum.Applied;
    case "Canceled":
      return StorageStatusEnum.Canceled;
    case "Approved":
      return StorageStatusEnum.Approved;
    case "Rejected":
      return StorageStatusEnum.Rejected;
    case "Shipped":
      return StorageStatusEnum.Shipped;
    case "Overdue":
      return StorageStatusEnum.Overdue;

    default:
      return 0;
  }
};

export { getEnumStorage };
