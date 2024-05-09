export const tempHeaders: {
  headerName: string;
  headerWidth: string;
  headerType: "Header" | "HeaderSort";
}[] = [
  { headerName: "상태", headerWidth: "80px", headerType: "Header" },
  { headerName: "신청 일시", headerWidth: "220px", headerType: "HeaderSort" },
  { headerName: "신청자", headerWidth: "110px", headerType: "HeaderSort" },
  { headerName: "연락처", headerWidth: "130px", headerType: "Header" },
  { headerName: "대여 일자", headerWidth: "180px", headerType: "HeaderSort" },
  { headerName: "반납 일자", headerWidth: "180px", headerType: "HeaderSort" },
  { headerName: "대여 물품", headerWidth: "auto", headerType: "Header" },
];
