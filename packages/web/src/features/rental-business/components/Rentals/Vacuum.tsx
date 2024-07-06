import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Radio from "@sparcs-clubs/web/common/components/Radio";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  RentalFrameProps,
  RentalLimitProps,
} from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { useGetAvailableRentals } from "@sparcs-clubs/web/features/rental-business/service/getAvailableRentals";

const Vacuum: React.FC<RentalLimitProps> = ({
  rentalDate,
  returnDate,
  rental,
  setRental,
}) => {
  const { data, isLoading, isError } = useGetAvailableRentals(
    rentalDate,
    returnDate,
  );
  const cordedLimit =
    data?.objects.find(item => item.name === "Vacuum Corded")?.maximum ?? 0;
  const cordlessLimit =
    data?.objects.find(item => item.name === "Vacuum Cordless")?.maximum ?? 0;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <Typography type="p">청소기 종류</Typography>
      <Radio
        value={rental?.vacuum as string}
        onChange={value =>
          setRental({
            ...rental,
            vacuum: value as RentalFrameProps["rental"]["vacuum"],
          })
        }
      >
        <Radio.Option value="cordless" disabled={cordlessLimit === 0}>
          무선 청소기
        </Radio.Option>
        <Radio.Option value="corded" disabled={cordedLimit === 0}>
          유선 청소기
        </Radio.Option>
      </Radio>
    </AsyncBoundary>
  );
};

export default Vacuum;
