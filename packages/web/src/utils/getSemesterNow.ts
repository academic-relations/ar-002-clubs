import useGetSemesters from "../common/services/getSemesters";

const useGetSemesterNow = () => {
  const { data, isLoading, isError } = useGetSemesters({
    pageOffset: 1,
    itemCount: 1,
  });

  return { semester: data?.semesters[0], isLoading, isError };
};

export default useGetSemesterNow;
