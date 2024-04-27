import React from "react";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalFrameProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

interface ToolLimitProps {
  powerDrillLimit?: number;
  driverLimit?: number;
  superGlueLimit?: number;
  nipperLimit?: number;
  plierLimit?: number;
  longNosePlierLimit?: number;
}

const Tool: React.FC<RentalFrameProps & ToolLimitProps> = ({
  powerDrillLimit = 99,
  driverLimit = 99,
  superGlueLimit = 99,
  nipperLimit = 99,
  plierLimit = 99,
  longNosePlierLimit = 99,
  rental,
  setRental,
}) => (
  <>
    <ItemNumberInput
      label="전동 드릴 세트 개수"
      placeholder="0개"
      itemLimit={powerDrillLimit}
      value={
        rental?.tool?.powerDrill ? String(rental?.tool?.powerDrill) : undefined
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
      label="롤테이너 개수"
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
      label="대형 개수"
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
      label="중형 개수"
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
      label="소형 개수"
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
  </>
);

export default Tool;
