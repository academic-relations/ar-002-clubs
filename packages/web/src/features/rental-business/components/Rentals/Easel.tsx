"use client";

import React from "react";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { useGetAvailableRentals } from "@sparcs-clubs/web/features/rental-business/service/getAvailableRentals";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const Easel: React.FC<RentalLimitProps> = ({
  rentalDate,
  returnDate,
  rental,
  setRental,
}) => {
  const { data, isLoading, isError } = useGetAvailableRentals(
    rentalDate,
    returnDate,
  );

  const easelLimit =
    data?.objects.find(item => item.name === "Easel")?.maximum ?? 0;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ItemNumberInput
        label="이젤 개수"
        placeholder="0개"
        itemLimit={easelLimit}
        value={rental?.easel ? String(rental.easel) : undefined}
        handleChange={value =>
          setRental({
            ...rental,
            easel: Number(value),
          })
        }
      />
    </AsyncBoundary>
  );
};

export default Easel;
