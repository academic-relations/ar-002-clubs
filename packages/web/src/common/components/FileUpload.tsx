import React, { useEffect, useMemo, useState } from "react";

import { ApiFil001RequestBody } from "@sparcs-clubs/interface/api/file/apiFil001";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";

import useFileUpload from "../services/postFileUpload";

import usePutFileS3 from "../services/putFileS3";

import FlexWrapper from "./FlexWrapper";
import Typography from "./Typography";

interface FileUploadProps {
  fileId?: string;
  placeholder?: string;
  onChange?: (string: string[]) => void;
  allowedTypes?: string[];
  multiple?: boolean;
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

const HiddenInput = styled.input`
  display: none;
`;

const FlexExpand = styled.div`
  flex: 1;
`;

const FileUpload: React.FC<FileUploadProps> = ({
  fileId = "file-upload-input",
  placeholder = "파일을 선택해주세요",
  onChange = () => {},
  allowedTypes = [],
  multiple = false,
}) => {
  const { mutate: uploadFileMutation } = useFileUpload();
  const { mutate: putFileS3Mutation } = usePutFileS3();

  const [files, setFiles] = useState<{ file: File; fileId?: string }[]>([]);

  useEffect(() => {
    if (files.length === 0) {
      return;
    }

    const notUploadedFiles = files.filter(file => !file.fileId);

    const info: ApiFil001RequestBody = {
      metadata: notUploadedFiles.map(file => ({
        type: file.file.type,
        name: file.file.name,
        size: file.file.size,
      })),
    };

    uploadFileMutation(
      { body: info },
      {
        onSuccess: data => {
          putFileS3Mutation(
            {
              files: files.map(file => file.file),
              uploadUrls: data.urls.map(url => url.uploadUrl),
            },
            {
              onSuccess: () => {
                onChange(data.urls.map(url => url.fileId));
              },
            },
          );
        },
      },
    );
  }, [files, putFileS3Mutation, uploadFileMutation, onChange]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(event.target.files ?? []).map(file => ({ file })));
  };

  const handleClick = () => {
    document.getElementById(fileId)?.click();
  };

  const text = useMemo(() => {
    if (files.length === 0) {
      return placeholder;
    }

    if (!multiple) {
      return files[0].file.name;
    }

    return `${files.length}개의 파일을 선택했습니다`;
  }, [files, multiple, placeholder]);

  return (
    <FlexWrapper direction="column" gap={12} style={{ alignSelf: "stretch" }}>
      <FileUploadInner onClick={handleClick}>
        <FileName>
          <Typography
            color={files.length ? "BLACK" : "GRAY.200"}
            fs={16}
            lh={20}
            fw="REGULAR"
          >
            {text}
          </Typography>
        </FileName>
        <UploadIcon>
          <Icon type="file_upload_outlined" size={20} color="white" />
        </UploadIcon>
        <HiddenInput
          type="file"
          accept={allowedTypes.join(",")}
          multiple={multiple}
          id={fileId}
          onChange={handleFileChange}
        />
      </FileUploadInner>
      <FlexWrapper direction="column" gap={8} padding="0 4px">
        {files.map(file => (
          <FlexWrapper direction="row" gap={8} key={file.file.name}>
            <Icon type="description_outlined" size={16} color="BLACK" />
            <FlexExpand>
              <Typography color="BLACK" fs={14} lh={16} fw="REGULAR">
                {file.file.name}
              </Typography>
            </FlexExpand>

            <Icon
              type="close_outlined"
              size={16}
              color="BLACK"
              onClick={() => {
                setFiles(files.filter(f => f.file.name !== file.file.name));
              }}
            />
          </FlexWrapper>
        ))}
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default FileUpload;
