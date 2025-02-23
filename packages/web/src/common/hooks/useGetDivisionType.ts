import { StatusDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import { TagColor } from "../components/Tag";
import useGetDivisions from "../services/getDivisions";

const useGetDivisionType = () => {
  const { data, isLoading, isError } = useGetDivisions();

  const divisionTypeList = data?.divisions;

  const getDivisionTagColor = (name: string): TagColor => {
    switch (name) {
      case "생활체육":
      case "구기체육":
        return "PINK";
      case "인문학술":
      case "이공학술":
        return "YELLOW";
      case "연행예술":
      case "전시창작":
        return "BLUE";
      case "생활문화":
      case "식생활":
      case "대중문화":
        return "GREEN";
      case "사회":
      case "종교":
        return "PURPLE";
      case "밴드음악":
        return "ORANGE";
      default:
        return "ORANGE";
    }
  };

  const divisionTypeTagList: { [key in number]: StatusDetail } =
    divisionTypeList?.reduce(
      (acc, division) => ({
        ...acc,
        [division.id]: {
          text: division.name,
          color: getDivisionTagColor(division.name),
        },
      }),
      {},
    ) ?? {};

  return {
    data: {
      divisions: data?.divisions,
      divisionTagList: divisionTypeTagList,
    },
    isLoading,
    isError,
  };
};

export default useGetDivisionType;
