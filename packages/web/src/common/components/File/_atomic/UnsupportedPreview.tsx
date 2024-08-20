import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import colors from "@sparcs-clubs/web/styles/themes/colors";

const UnsupportedPreviewWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 8px;
  gap: 8px;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

const UnsupportedPreview = () => (
  <UnsupportedPreviewWrapper>
    <Icon type="insert_drive_file" size={24} color={colors.GRAY[300]} />
    <Typography fs={14} lh={16} color="GRAY.300">
      미리보기가 없습니다
    </Typography>
  </UnsupportedPreviewWrapper>
);

export default UnsupportedPreview;
