import Typography from "@sparcs-clubs/web/common/components/Typography";
import { RentalFrameProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const Tool: React.FC<RentalFrameProps> = () => (
  <>
    <Typography type="p">전동 드릴 세트 개수</Typography>
    <Typography type="p">드라이버 개수</Typography>
    <Typography type="p">슈퍼글루 개수</Typography>
    <Typography type="p">니퍼 개수</Typography>
    <Typography type="p">플라이어 개수</Typography>
    <Typography type="p">롱노즈플라이어 개수</Typography>
  </>
);

export default Tool;
