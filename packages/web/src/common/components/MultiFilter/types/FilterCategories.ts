export interface CategoryProps {
  name: string; // 예: 동아리 구분
  content: string[]; // 예: 정동아리, 가동아리 enum을 string으로 바꿔서 전달
  selectedContent: string[]; // 예: 정동아리
}
