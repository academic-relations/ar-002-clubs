import React from "react";
import Radio from "@sparcs-clubs/web/common/components/Radio";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { RentalFrameProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const Vacuum: React.FC<RentalFrameProps> = ({ rental, setRental }) => (
  <>
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
      <Radio.Option value="cordless">무선 청소기</Radio.Option>
      <Radio.Option value="corded">유선 청소기</Radio.Option>
    </Radio>
  </>
);

export default Vacuum;
