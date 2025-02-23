import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import { FileDetail } from "@sparcs-clubs/web/common/components/File/attachment";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  FileIdType,
  RegisterClubModel,
} from "@sparcs-clubs/web/features/register-club/types/registerClub";

interface SingleUploadWithTextAndTemplateProps {
  fileId: FileIdType;
  title: string;
  content?: string;
  downloadUrl: string;
  downloadFileName: string;
  initialFile?: FileDetail;
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
  initialFile = undefined,
}) => {
  const formCtx = useFormContext<RegisterClubModel>();
  const { control, setValue } = formCtx;

  const onDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = downloadFileName;
    a.click();
  }, [downloadFileName, downloadUrl]);

  const updateSingleFile = useCallback(
    (data: FileDetail[]) => {
      if (data.length === 0) {
        setValue(fileId, undefined, { shouldValidate: true });
        return;
      }
      setValue(fileId, data[0], { shouldValidate: true });
    },
    [fileId],
  );

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
      <FormController
        name={fileId}
        required={fileId !== "externalInstructionFile"}
        control={control}
        renderItem={props => (
          <FileUpload
            {...props}
            fileId={fileId}
            initialFiles={initialFile ? [initialFile] : []}
            onChange={files => updateSingleFile(files)}
          />
        )}
      />
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
