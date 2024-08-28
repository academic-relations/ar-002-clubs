import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import MyClubProfTable from "@sparcs-clubs/web/features/my/components/MyClubProfTable";
import useProfClubRegisterList from "@sparcs-clubs/web/features/my/services/getProfClubRegisterList";

const RegisterClubProfFrame = () => {
  const { data, isLoading, isError } = useProfClubRegisterList();

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <MyClubProfTable clubProfRegisterList={data ?? { items: [] }} />
    </AsyncBoundary>
  );
};
export default RegisterClubProfFrame;
