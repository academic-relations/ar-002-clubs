import React, { useEffect } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { useGetAvailableRentals } from "@sparcs-clubs/web/features/rental-business/service/getAvailableRentals";

const Tool: React.FC<RentalLimitProps> = ({
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

  const [powerDrillError, setPowerDrillError] = React.useState(false);
  const [driverError, setDriverError] = React.useState(false);
  const [superGlueError, setSuperGlueError] = React.useState(false);
  const [nipperError, setNipperError] = React.useState(false);
  const [plierError, setPlierError] = React.useState(false);
  const [longNosePlierError, setLongNosePlierError] = React.useState(false);

  useEffect(() => {
    const hasError =
      powerDrillError ||
      driverError ||
      superGlueError ||
      nipperError ||
      plierError ||
      longNosePlierError;
    setHasError(hasError);
  }, [
    powerDrillError,
    driverError,
    superGlueError,
    nipperError,
    plierError,
    longNosePlierError,
    setHasError,
  ]);

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
        setErrorStatus={setPowerDrillError}
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
        setErrorStatus={setDriverError}
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
        setErrorStatus={setSuperGlueError}
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
        setErrorStatus={setNipperError}
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
        setErrorStatus={setPlierError}
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
        setErrorStatus={setLongNosePlierError}
      />
    </AsyncBoundary>
  );
};

export default Tool;
