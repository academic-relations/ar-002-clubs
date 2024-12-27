import { StorageStatusEnum } from "@sparcs-clubs/interface/common/enum/storage.enum";

const getEnumStorage = (string: string): StorageStatusEnum => {
  switch (string) {
    case "applied":
      return StorageStatusEnum.Applied;
    case "canceled":
      return StorageStatusEnum.Canceled;
    case "approved":
      return StorageStatusEnum.Approved;
    case "rejected":
      return StorageStatusEnum.Rejected;
    case "received":
      return StorageStatusEnum.Received;
    case "shipped":
      return StorageStatusEnum.Shipped;
    case "overdue":
      return StorageStatusEnum.Overdue;

    default:
      return 0;
  }
};

const getValueStorage = (e: StorageStatusEnum): string => {
  switch (e) {
    case StorageStatusEnum.Applied:
      return "applied";
    case StorageStatusEnum.Canceled:
      return "canceled";
    case StorageStatusEnum.Approved:
      return "approved";
    case StorageStatusEnum.Rejected:
      return "rejected";
    case StorageStatusEnum.Received:
      return "received";
    case StorageStatusEnum.Shipped:
      return "shipped";
    case StorageStatusEnum.Overdue:
      return "overdue";

    default:
      return "";
  }
};

export { getEnumStorage, getValueStorage };
