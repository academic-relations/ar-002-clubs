import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";

const useHasAdvisor = (
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
    data: data.advisor !== undefined && data.advisor !== null,
    isLoading,
    isError,
  };
};

export default useHasAdvisor;
