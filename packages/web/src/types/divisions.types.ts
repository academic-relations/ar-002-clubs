enum DivisionType /** TODO - 20240320 기준으로 번역 단어장에 각 division 이름에 대한 번역이 존재하지 않아 임시로 제작한 번역이기 때문에 추후 올바르게 수정 요망 */ {
  LifeCulture = 1, // 생활문화
  PerformingArts, // 연행예술
  ExhibitionCreation, // 전시창작
  BandMusic, // 밴드음악
  VocalMusic, // 보컬음악
  InstrumentalMusic, // 연주음악
  Society, // 사회
  Religion, // 종교
  BallSports, // 구기체육
  LifeSports, // 생활체육
  ScienceEngineeringAcademics, // 이공학술
  HumanitiesAcademics, // 인문학술
}

const getDisplayName = (type: DivisionType) => {
  switch (type) {
    case DivisionType.LifeCulture:
      return "생활문화";
    case DivisionType.PerformingArts:
      return "연행예술";
    case DivisionType.ExhibitionCreation:
      return "전시창작";
    case DivisionType.BandMusic:
      return "밴드음악";
    case DivisionType.VocalMusic:
      return "보컬음악";
    case DivisionType.InstrumentalMusic:
      return "연주음악";
    case DivisionType.Society:
      return "사회";
    case DivisionType.Religion:
      return "종교";
    case DivisionType.BallSports:
      return "구기체육";
    case DivisionType.LifeSports:
      return "생활체육";
    case DivisionType.ScienceEngineeringAcademics:
      return "이공학술";
    case DivisionType.HumanitiesAcademics:
      return "인문학술";
    default:
      return "";
  }
};

const getEnum = (string: string) => {
  switch (string) {
    case "생활문화":
      return 1;
    case "연행예술":
      return 2;
    case "전시창작":
      return 3;
    case "밴드음악":
      return 4;
    case "보컬음악":
      return 5;
    case "연주음악":
      return 6;
    case "사회":
      return 7;
    case "종교":
      return 8;
    case "구기체육":
      return 9;
    case "생활체육":
      return 10;
    case "이공학술":
      return 11;
    case "인문학술":
      return 12;
    default:
      return 0;
  }
};

export { DivisionType, getDisplayName, getEnum };
