import React from "react";

import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";

import Typography from "./Typography";

interface FileUploadProps {
  placeholder?: string;
}

const FileUploadInner = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 100%;

  /* gray200 */
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;

  /* Inside auto layout
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
`;

const FileName = styled.div`
  flex: none;
  order: 0;
  flex-grow: 1;
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 10px;

  /* white */
  background: ${({ theme }) => theme.colors.WHITE};

  /* Inside auto layout
    flex: none;
    order: 0;
    flex-grow: 1; */
`;

const UploadIcon = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  gap: 10px;

  width: 40px;
  border-radius: 0px 4px 4px 0px;

  /* primary */
  background: ${({ theme }) => theme.colors.PRIMARY};

  /* Inside auto layout */
  /* flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
`;

const FileUpload: React.FC<FileUploadProps> = ({
  placeholder = "파일을 선택해주세요",
}) => (
  <FileUploadInner>
    <FileName>
      <Typography color="GRAY.200" fs={16} lh={20} fw="REGULAR">
        {placeholder}
      </Typography>
    </FileName>
    <UploadIcon>
      <Icon type="file_upload_outlined" size={20} color="white" />
    </UploadIcon>
  </FileUploadInner>
);

export default FileUpload;
