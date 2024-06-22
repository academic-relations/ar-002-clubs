import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { useGetAvailableRentals } from "@sparcs-clubs/web/features/rental-business/service/getAvailableRentals";

const Tool: React.FC<RentalLimitProps> = ({
  rentalDate,
  returnDate,
  rental,
  setRental,
}) => {
  const { data, isLoading, isError } = useGetAvailableRentals(
    rentalDate,
    returnDate,
  );

  const powerDrillLimit =
    data?.objects.find(item => item.name === "Power Drill Set")?.maximum ?? 0;
  const driverLimit =
    data?.objects.find(item => item.name === "Driver Set")?.maximum ?? 0;
  const superGlueLimit =
    data?.objects.find(item => item.name === "Super Glue")?.maximum ?? 0;
  const nipperLimit =
    data?.objects.find(item => item.name === "Nipper")?.maximum ?? 0;
  const plierLimit =
    data?.objects.find(item => item.name === "Plier")?.maximum ?? 0;
  const longNosePlierLimit =
    data?.objects.find(item => item.name === "Long Nose Plier")?.maximum ?? 0;
  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ItemNumberInput
        label="전동 드릴 세트 개수"
        placeholder="0개"
        itemLimit={powerDrillLimit}
        value={
          rental?.tool?.powerDrill
            ? String(rental?.tool?.powerDrill)
            : undefined
        }
        handleChange={value =>
          setRental({
            ...rental,
            tool: {
              ...rental.tool,
              powerDrill: Number(value),
            },
          })
        }
      />
      <ItemNumberInput
        label="드라이버 세트 개수"
        placeholder="0개"
        itemLimit={driverLimit}
        value={rental?.tool?.driver ? String(rental?.tool?.driver) : undefined}
        handleChange={value =>
          setRental({
            ...rental,
            tool: {
              ...rental.tool,
              driver: Number(value),
            },
          })
        }
      />
      <ItemNumberInput
        label="순간접착제 개수"
        placeholder="0개"
        itemLimit={superGlueLimit}
        value={
          rental?.tool?.superGlue ? String(rental?.tool?.superGlue) : undefined
        }
        handleChange={value =>
          setRental({
            ...rental,
            tool: {
              ...rental.tool,
              superGlue: Number(value),
            },
          })
        }
      />
      <ItemNumberInput
        label="니퍼 개수"
        placeholder="0개"
        itemLimit={nipperLimit}
        value={rental?.tool?.nipper ? String(rental?.tool?.nipper) : undefined}
        handleChange={value =>
          setRental({
            ...rental,
            tool: {
              ...rental.tool,
              nipper: Number(value),
            },
          })
        }
      />
      <ItemNumberInput
        label="펜치 개수"
        placeholder="0개"
        itemLimit={plierLimit}
        value={rental?.tool?.plier ? String(rental?.tool?.plier) : undefined}
        handleChange={value =>
          setRental({
            ...rental,
            tool: {
              ...rental.tool,
              plier: Number(value),
            },
          })
        }
      />
      <ItemNumberInput
        label="롱노우즈 개수"
        placeholder="0개"
        itemLimit={longNosePlierLimit}
        value={
          rental?.tool?.longNosePlier
            ? String(rental?.tool?.longNosePlier)
            : undefined
        }
        handleChange={value =>
          setRental({
            ...rental,
            tool: {
              ...rental.tool,
              longNosePlier: Number(value),
            },
          })
        }
      />
    </AsyncBoundary>
  );
};

export default Tool;
