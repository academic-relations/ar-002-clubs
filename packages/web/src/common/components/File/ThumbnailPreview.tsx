import React from "react";

import mime from "mime";

import FlexWrapper from "../FlexWrapper";

import Typography from "../Typography";

import ImagePreview from "./_atomic/ImagePreview";
import UnsupportedPreview from "./_atomic/UnsupportedPreview";

interface ThumbnailPreviewProps {
  fileUrl: string;
  fileName: string;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  fileUrl,
  fileName,
}: ThumbnailPreviewProps) => {
  const mimeType = mime.getType(fileName) || "unknown";

  const previewSupportFile = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];
  const isPreviewSupported = previewSupportFile.includes(mimeType);

  return (
    <FlexWrapper gap={8} direction="column" style={{ width: "160px" }}>
      {isPreviewSupported ? (
        <ImagePreview src={fileUrl} />
      ) : (
        <UnsupportedPreview />
      )}
      <Typography
        fs={14}
        lh={16}
        style={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        title={fileName}
      >
        {fileName}
      </Typography>
    </FlexWrapper>
  );
};

export default ThumbnailPreview;
