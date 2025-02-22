import useGetRegistrationAvailableClubs from "../services/useGetRegistrationAvailableClubs";

const useGetAvailableRegistrationInfo = () => {
  const { data, isLoading, isError } = useGetRegistrationAvailableClubs();

  return {
    data: {
      ...data,
      noManageClub: data?.club == null,
      haveAvailableRegistration:
        data?.club && data.club.availableRegistrationTypeEnums.length > 0,
      availableRegistrations: data?.club?.availableRegistrationTypeEnums ?? [],
    },
    isLoading,
    isError,
  };
};

export default useGetAvailableRegistrationInfo;
