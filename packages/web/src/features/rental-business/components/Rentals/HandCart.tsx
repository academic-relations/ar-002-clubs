import Typography from "@sparcs-clubs/web/common/components/Typography";
import { RentalFrameProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const HandCart: React.FC<RentalFrameProps> = () => (
  <>
    <Typography type="p">롤테이너 개수</Typography>
    <Typography type="p">대형 개수</Typography>
    <Typography type="p">중형 개수</Typography>
    <Typography type="p">소형 개수</Typography>
  </>
);

export default HandCart;
