import React from "react";

import FlexWrapper from "../FlexWrapper";

import Typography from "../Typography";

import ImagePreview from "./_atomic/ImagePreview";
import UnsupportedPreview from "./_atomic/UnsupportedPreview";
import Attachment, { isPreviewSupported } from "./attachment";

interface ThumbnailPreviewProps {
  file: Attachment;
  onClick: () => void;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  file,
  onClick,
}: ThumbnailPreviewProps) => (
  <FlexWrapper
    gap={8}
    direction="column"
    style={{ width: "160px" }}
    onClick={onClick}
  >
    {isPreviewSupported(file) ? (
      <ImagePreview src={file.src} alt={file.name} />
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
);

export default ThumbnailPreview;
