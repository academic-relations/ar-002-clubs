import React, { useEffect, useState } from "react";

import styled from "styled-components";

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import { getFileFromUrl } from "@sparcs-clubs/web/common/components/File/attachment";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface SingleUploadWithTextAndTemplateProps {
  fileId: string;
  title: string;
  content?: string;
  onFormatDownload?: VoidFunction;
  initialFile?: {
    id: string;
    name: string;
    url: string;
  };
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
  initialFile = undefined,
  onChange = () => {},
}) => {
  const [files, setFiles] = useState<{ file: File; fileId?: string }[]>([]);
  useEffect(() => {
    console.log(fileId, "initialFile", initialFile);
    if (initialFile) {
      getFileFromUrl(initialFile.url, initialFile.name).then(file =>
        setFiles([
          {
            file,
            fileId: initialFile.id,
          },
        ]),
      );
    }
  }, [initialFile, setFiles]);

  useEffect(() => {
    console.log("files", files);
  }, [files]);

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
      <FileUpload fileId={fileId} initialFiles={files} onChange={onChange} />
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
};
export default SingleUploadWithTextAndTemplate;
