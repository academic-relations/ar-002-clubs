import React, { useMemo, useState } from "react";

import { ApiFil001RequestBody } from "@sparcs-clubs/interface/api/file/apiFil001";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";

import useFileUpload from "../services/postFileUpload";

import usePutFileS3 from "../services/putFileS3";

import Attachment from "./File/attachment";
import ThumbnailPreviewList from "./File/ThumbnailPreviewList";
import FlexWrapper from "./FlexWrapper";
import Typography from "./Typography";

interface FileUploadProps {
  fileId?: string;
  placeholder?: string;
  initialFiles?: {
    file: File;
    fileId?: string;
  }[];
  onChange?: (string: string[]) => void;
  allowedTypes?: string[];
  multiple?: boolean;
  disabled?: boolean;
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
  initialFiles = [],
  onChange = () => {},
  allowedTypes = [],
  multiple = false,
  disabled = false,
}) => {
  const { mutate: uploadFileMutation } = useFileUpload();
  const { mutate: putFileS3Mutation } = usePutFileS3();

  const [files, setFiles] =
    useState<{ file: File; fileId?: string }[]>(initialFiles);

  /* NOTE: (@dora) must remove to prevent infinite loop */
  // useEffect(() => {
  //   setFiles(initialFiles);
  // }, [initialFiles]);

  /* TODO: (@dora) refactor !!!!!!! */
  interface FinalFile {
    file: File;
    fileId?: string;
  }

  const onSubmit = (_files: FinalFile[]) => {
    if (_files.length === 0) {
      return;
    }

    const notUploadedFiles = _files.filter(file => !file.fileId);

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
              files: _files.map(file => file.file),
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
  };

  const updateFiles = (_files: Attachment[]) => {
    const updatedFiles = files.filter(f =>
      _files.map(_file => _file.name).includes(f.file.name),
    );
    setFiles(updatedFiles);
    onChange(updatedFiles.map(file => file.fileId!));
    onSubmit(updatedFiles);
  };
  const removeFile = (_file: FinalFile) => {
    const updatedFiles = files.filter(file => file.fileId !== _file.fileId);
    setFiles(updatedFiles);
    onChange(updatedFiles.map(file => file.fileId!));
    onSubmit(updatedFiles);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFiles = Array.from(event.target.files ?? []).map(file => ({
      file,
    }));
    setFiles(updatedFiles);
    onSubmit(updatedFiles);
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
        {multiple && (
          <ThumbnailPreviewList
            fileList={files.map(file => ({
              name: file.file.name,
              src: URL.createObjectURL(file.file),
            }))}
            onChange={_files => updateFiles(_files)}
            disabled={disabled}
          />
        )}
        {!multiple && files.length > 0 && (
          <FlexWrapper direction="row" gap={8} key={files[0].file.name}>
            <Icon type="description_outlined" size={16} color="BLACK" />
            <FlexExpand>
              <Typography color="BLACK" fs={14} lh={16} fw="REGULAR">
                {files[0].file.name}
              </Typography>
            </FlexExpand>

            {!disabled && (
              <Icon
                type="close_outlined"
                size={16}
                color="BLACK"
                onClick={() => removeFile(files[0])}
              />
            )}
          </FlexWrapper>
        )}
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default FileUpload;
