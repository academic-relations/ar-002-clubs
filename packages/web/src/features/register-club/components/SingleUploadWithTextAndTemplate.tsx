import React from "react";

import styled from "styled-components";

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface SingleUploadWithTextAndTemplateProps {
  fileId: string;
  title: string;
  content?: string;
  downloadUrl: string;
  downloadFileName: string;
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
  downloadUrl,
  downloadFileName,
  onChange = () => {},
}) => {
  const onDownload = () => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = downloadFileName;
    a.click();
  };

  return (
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
        onClick={onDownload}
      >
        양식 다운로드
      </IconButton>
    </SingleUploadWithTextAndTemplateInner>
  );
};

export default SingleUploadWithTextAndTemplate;
