import useGetActivityTerms from "../services/useGetActivityTerms";
import { ActivityTerm } from "../types/activityTerm";

const useGetActivityTerm = (
  clubId: number,
  activityTermId: number,
): {
  data: ActivityTerm;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useGetActivityTerms({ clubId });

  const activityTerm = data?.terms.find(term => term.id === activityTermId);
  if (isLoading || isError || !activityTerm) {
    return {
      data: {} as ActivityTerm,
      isLoading,
      isError,
    };
  }

  return {
    data: activityTerm,
    isLoading,
    isError,
  };
};

export default useGetActivityTerm;
