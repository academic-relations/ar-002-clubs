import React from "react";

import styled from "styled-components";

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface SingleUploadWithTextAndTemplateProps {
  fileId: string;
  title: string;
  content?: string;
  onFormatDownload?: VoidFunction;
  onChange?: (string: string[]) => void;
}

const SingleUploadWithTextAndTemplateInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  white-space: pre-line;
`;

const SingleUploadWithTextAndTemplate: React.FC<
  SingleUploadWithTextAndTemplateProps
> = ({
  fileId,
  title,
  content = undefined,
  onFormatDownload = () => {},
  onChange = () => {},
}) => (
  <SingleUploadWithTextAndTemplateInner>
    <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
      {title}
    </Typography>
    {content && (
      <Typography ff="PRETENDARD" fs={14} lh={20} color="GRAY.600">
        {content}
      </Typography>
    )}
    <FileUpload fileId={fileId} onChange={onChange} />
    <IconButton
      style={{ marginTop: 4 }}
      type="default"
      icon="save_alt"
      onClick={onFormatDownload}
    >
      양식 다운로드
    </IconButton>
  </SingleUploadWithTextAndTemplateInner>
);

export default SingleUploadWithTextAndTemplate;
