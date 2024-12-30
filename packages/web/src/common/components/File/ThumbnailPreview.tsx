import React from "react";

import styled from "styled-components";

import FlexWrapper from "../FlexWrapper";

import Icon from "../Icon";
import Typography from "../Typography";

import ImagePreview from "./_atomic/ImagePreview";
import UnsupportedPreview from "./_atomic/UnsupportedPreview";
import { FileDetail, isPreviewSupported } from "./attachment";

interface ThumbnailPreviewProps {
  file: FileDetail;
  onClick: () => void;
  onDelete?: (file: FileDetail) => void;
  disabled?: boolean;
}

const DeleteButton = styled.div`
  position: absolute;
  padding: 8px;
  right: 0;
  z-index: 1;
`;

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  file,
  onClick,
  onDelete = () => {},
  disabled = false,
}: ThumbnailPreviewProps) => (
  <FlexWrapper gap={0} direction="column">
    {!disabled && (
      <DeleteButton onClick={() => onDelete(file)}>
        <Icon type="close_outlined" size={16} color="BLACK" />
      </DeleteButton>
    )}
    <FlexWrapper
      gap={8}
      direction="column"
      style={{ width: "160px" }}
      onClick={onClick}
    >
      {isPreviewSupported(file) ? (
        <ImagePreview src={file.url} alt={file.name} />
      ) : (
        <UnsupportedPreview file={file} />
      )}
      <Typography
        fs={14}
        lh={16}
        style={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        title={file.name}
      >
        {file.name}
      </Typography>
    </FlexWrapper>
  </FlexWrapper>
);

export default ThumbnailPreview;
