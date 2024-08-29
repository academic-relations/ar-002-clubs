interface HeaderInterface {
  headerName: string;
  headerWidth: string;
  headerType: "Header" | "HeaderSort";
}

export const rentalBusinessHeaders: HeaderInterface[] = [
  { headerName: "상태", headerWidth: "90px", headerType: "HeaderSort" },
  { headerName: "신청 일시", headerWidth: "220px", headerType: "HeaderSort" },
  { headerName: "신청자", headerWidth: "110px", headerType: "HeaderSort" },
  { headerName: "연락처", headerWidth: "130px", headerType: "Header" },
  { headerName: "대여 일자", headerWidth: "180px", headerType: "HeaderSort" },
  { headerName: "반납 일자", headerWidth: "180px", headerType: "HeaderSort" },
  {
    headerName: "대여 물품",
    headerWidth: "minmax(0,100%)",
    headerType: "Header",
  },
];

export const printingBusinessHeaders: HeaderInterface[] = [
  { headerName: "상태", headerWidth: "90px", headerType: "HeaderSort" },
  { headerName: "신청 일시", headerWidth: "220px", headerType: "HeaderSort" },
  { headerName: "신청자", headerWidth: "110px", headerType: "HeaderSort" },
  { headerName: "연락처", headerWidth: "130px", headerType: "Header" },
  { headerName: "수령 일시", headerWidth: "220px", headerType: "HeaderSort" },
  {
    headerName: "인쇄 매수",
    headerWidth: "minmax(0,100%)",
    headerType: "Header",
  },
];

export const activityCertificateHeaders: HeaderInterface[] = [
  { headerName: "상태", headerWidth: "90px", headerType: "HeaderSort" },
  { headerName: "신청 일시", headerWidth: "220px", headerType: "HeaderSort" },
  { headerName: "신청자", headerWidth: "110px", headerType: "HeaderSort" },
  { headerName: "연락처", headerWidth: "130px", headerType: "Header" },
  {
    headerName: "발급 매수",
    headerWidth: "minmax(0,100%)",
    headerType: "Header",
  },
  { headerName: "비고", headerWidth: "minmax(0,100%)", headerType: "Header" },
];

export const commonSpaceHeaders: HeaderInterface[] = [
  { headerName: "상태", headerWidth: "90px", headerType: "HeaderSort" },
  { headerName: "신청 일시", headerWidth: "220px", headerType: "HeaderSort" },
  { headerName: "신청자", headerWidth: "110px", headerType: "HeaderSort" },
  { headerName: "연락처", headerWidth: "130px", headerType: "Header" },
  { headerName: "예약 일자", headerWidth: "180px", headerType: "HeaderSort" },
  { headerName: "예약 시간", headerWidth: "140px", headerType: "HeaderSort" },
  {
    headerName: "예약 호실",
    headerWidth: "minmax(0,100%)",
    headerType: "HeaderSort",
  },
];
