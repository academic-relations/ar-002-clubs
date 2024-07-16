import React from "react";

import styled from "styled-components";

import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import IconButton from "@sparcs-clubs/web/common/components/Forms/IconButton";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface SingleUploadWithTextAndTemplateProps {
  title: string;
  content?: string;
  onFormatDownload?: VoidFunction;
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
> = ({ title, content = undefined, onFormatDownload = () => {} }) => (
  <SingleUploadWithTextAndTemplateInner>
    <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
      {title}
    </Typography>
    {content && (
      <Typography ff="PRETENDARD" fs={14} lh={20} color="GRAY.600">
        {content}
      </Typography>
    )}
    <FileUpload />
    <IconButton
      style={{ marginTop: 4 }}
      type="default"
      iconType="save_alt"
      buttonText="양식 다운로드"
      onClick={onFormatDownload}
    />
  </SingleUploadWithTextAndTemplateInner>
);

export default SingleUploadWithTextAndTemplate;
