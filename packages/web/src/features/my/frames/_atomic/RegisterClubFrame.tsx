import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import MyClubTable from "@sparcs-clubs/web/features/my/components/MyClubTable";
import { useGetMyClubRegistration } from "@sparcs-clubs/web/features/my/services/getMyClubRegistration";

const RegisterClubFrame = () => {
  const { data, isLoading, isError } = useGetMyClubRegistration();

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <MyClubTable clubRegisterList={data ?? { registrations: [] }} />
    </AsyncBoundary>
  );
};
export default RegisterClubFrame;
