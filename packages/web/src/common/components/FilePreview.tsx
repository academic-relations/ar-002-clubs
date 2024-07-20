import React from "react";

import InsertDriveFileOutlined from "@mui/icons-material/InsertDriveFileOutlined";

import FlexWrapper from "./FlexWrapper";
import Icon from "./Icon";
import Typography from "./Typography";

interface FilePreviewProps {
  fileName: string;
  removable?: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  fileName,
  removable = false,
}) => (
  <FlexWrapper direction="row" gap={8}>
    {/* TODO: Icon 컴포넌트 사용 */}
    <InsertDriveFileOutlined fontSize="inherit" />
    <Typography fs={14} lh={16} fw="REGULAR" style={{ flex: 1 }}>
      {fileName}
    </Typography>
    {/* TODO: edit 기능 넣기 */}
    {removable && <Icon type="close" size={16} />}
  </FlexWrapper>
);

export default FilePreview;
