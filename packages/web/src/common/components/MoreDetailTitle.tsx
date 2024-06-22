import React from "react";

import { useRouter } from "next/navigation";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/TextButton";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface MoreDetailTitleProps {
  title: string;
  moreDetail: string;
  moreDetailPath: string;
}

const MoreDetailTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
`;

const MoreDetailTitle: React.FC<MoreDetailTitleProps> = ({
  title,
  moreDetail,
  moreDetailPath,
}) => {
  const router = useRouter();
  const onClick = () => {
    router.push(moreDetailPath);
  };

  return (
    <MoreDetailTitleWrapper>
      <Typography
        ff="PRETENDARD"
        fs={20}
        fw="MEDIUM"
        lh={24}
        color="BLACK"
        style={{ flex: 1 }}
      >
        {title}
      </Typography>
      <TextButton text={moreDetail} onClick={onClick} />
    </MoreDetailTitleWrapper>
  );
};
export default MoreDetailTitle;
