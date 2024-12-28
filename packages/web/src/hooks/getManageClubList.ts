import useGetMyClubProfessor from "../features/my/clubs/service/getMyClubProfessor";
import useGetSemesterNow from "../utils/getSemesterNow";

// TODO: (@dora) useGetRepresentativeManageClubList

export const useGetProfessorManageClubList = () => {
  const {
    data: clubData,
    isLoading: clubDataIsLoading,
    isError: clubDataIsError,
  } = useGetMyClubProfessor();
  const {
    semester: semesterData,
    isLoading: semesterIsLoading,
    isError: semesterIsError,
  } = useGetSemesterNow();

  const isLoading = clubDataIsLoading || semesterIsLoading;
  const isError = clubDataIsError || semesterIsError;

  if (isLoading || isError || !clubData || !semesterData)
    return {
      data: [],
      isLoading,
      isError,
    };

  const data =
    clubData.semesters.find(semester => semester.id === semesterData.id)
      ?.clubs ?? [];
  return {
    data,
    isLoading,
    isError,
  };
};
