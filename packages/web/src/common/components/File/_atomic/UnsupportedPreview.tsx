import React from "react";

import styled from "styled-components";

import noPreview from "@sparcs-clubs/web/assets/no-preview.png";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import colors from "@sparcs-clubs/web/styles/themes/colors";

import Attachment from "../attachment";

interface UnsupportedPreviewProps {
  file: Attachment;
}

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

const UnsupportedPreview: React.FC<UnsupportedPreviewProps> = ({ file }) => (
  <UnsupportedPreviewWrapper>
    <Icon type="insert_drive_file" size={24} color={colors.GRAY[300]} />
    <Typography fs={14} lh={16} color="GRAY.300">
      미리보기가 없습니다
      <img src={noPreview.src} alt={file.name} style={{ display: "none" }} />
    </Typography>
  </UnsupportedPreviewWrapper>
);

export default UnsupportedPreview;
