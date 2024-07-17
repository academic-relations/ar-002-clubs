import React from "react";

import InsertDriveFileOutlined from "@mui/icons-material/InsertDriveFileOutlined";
import styled from "styled-components";

import Icon from "./Icon";
import Typography from "./Typography";

interface FilePreviewProps {
  fileName: string;
  edit?: boolean;
}

const FilePreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  font-size: 16px;
  justify-content: space-between;
`;

const FilePreview: React.FC<FilePreviewProps> = ({
  fileName,
  edit = false,
}) => (
  <FilePreviewWrapper>
    <InsertDriveFileOutlined fontSize="inherit" />
    <Typography
      ff="PRETENDARD"
      fs={14}
      lh={16}
      fw="REGULAR"
      color="BLACK"
      style={{ flex: 1 }}
    >
      {fileName}
    </Typography>
    {/* TODO: edit 기능 넣기 */}
    {edit && <Icon type="close" size={16} />}
  </FilePreviewWrapper>
);

export default FilePreview;
