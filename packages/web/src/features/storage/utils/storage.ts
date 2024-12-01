export const getKrStorageStatus = (status: string) => {
  switch (status) {
    case "applied":
      return "신청";
    case "canceled":
      return "취소";
    case "approved":
      return "승인";
    case "rejected":
      return "반려";
    case "received":
      return "보관";
    case "shipped":
      return "출고";
    case "overdue":
      return "연체";
    default:
      return "";
  }
};
