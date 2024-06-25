import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { useGetAvailableRentals } from "@sparcs-clubs/web/features/rental-business/service/getAvailableRentals";

const Mat: React.FC<RentalLimitProps> = ({
  rentalDate,
  returnDate,
  rental,
  setRental,
  setHasError,
}) => {
  const { data, isLoading, isError } = useGetAvailableRentals(
    rentalDate,
    returnDate,
  );

  const matLimit =
    data?.objects.find(item => item.name === "Mat")?.maximum ?? 0;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ItemNumberInput
        label="돗자리 개수"
        placeholder="0개"
        itemLimit={matLimit}
        value={rental?.mat ? String(rental?.mat) : undefined}
        handleChange={value =>
          setRental({
            ...rental,
            mat: Number(value),
          })
        }
        setErrorStatus={setHasError}
      />
    </AsyncBoundary>
  );
};

export default Mat;
