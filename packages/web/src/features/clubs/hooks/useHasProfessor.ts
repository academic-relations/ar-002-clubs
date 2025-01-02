import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";

const useHasProfessor = (
  clubId: string,
): {
  data: boolean;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useGetClubDetail(clubId);

  if (isLoading || isError || !data) {
    return {
      data: false,
      isLoading,
      isError,
    };
  }

  return {
    data: data.advisor !== undefined,
    isLoading,
    isError,
  };
};

export default useHasProfessor;
