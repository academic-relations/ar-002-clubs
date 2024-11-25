import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import Radio from "@sparcs-clubs/web/common/components/Radio";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { getMaxRental } from "@sparcs-clubs/web/features/rental-business/utils/getMaxRental";

const Vacuum: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
  const { control, getValues } = formCtx;

  return (
    <>
      <Typography fs={16} lh={20} fw="MEDIUM">
        청소기 종류
      </Typography>
      <FormController
        name="vacuum"
        control={control}
        renderItem={props => (
          <Radio {...props} value={getValues("vacuum") ?? ""}>
            <Radio.Option
              value="cordless"
              disabled={getMaxRental(availableRentals, "Vacuum Cordless") === 0}
            >
              무선 청소기
            </Radio.Option>
            <Radio.Option
              value="corded"
              disabled={getMaxRental(availableRentals, "Vacuum Corded") === 0}
            >
              유선 청소기
            </Radio.Option>
          </Radio>
        )}
      />
    </>
  );
};

export default Vacuum;
