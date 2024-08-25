"use client";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import MyRegisterClubEditFrame from "@sparcs-clubs/web/features/my/register-club/frames/MyRegisterClubEditFrame";
import useGetClubRegistration from "@sparcs-clubs/web/features/my/services/useGetClubRegistration";
import { MyClubRegistrationDetail } from "@sparcs-clubs/web/features/my/types/myClubRegistration";

const MyRegisterClubEdit = () => {
  const { id: applyId } = useParams();

  const { data, isLoading, isError } = useGetClubRegistration({
    applyId: +applyId,
  });

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <MyRegisterClubEditFrame
        applyId={+applyId}
        detail={data as MyClubRegistrationDetail}
      />
    </AsyncBoundary>
  );
};
export default MyRegisterClubEdit;
