import React from "react";

import FlexWrapper from "../FlexWrapper";

import Typography from "../Typography";

import ImagePreview from "./_atomic/ImagePreview";
import UnsupportedPreview from "./_atomic/UnsupportedPreview";

interface ThumbnailPreviewProps {
  fileSrc: string;
  fileName: string;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  fileSrc,
  fileName,
}: ThumbnailPreviewProps) => {
  const fileExt = fileName.split(".").pop() || "unknown";

  const previewSupportFile = ["png", "jpeg", "jpg", "webp"];
  const isPreviewSupported = previewSupportFile.includes(fileExt.toLowerCase());

  return (
    <FlexWrapper gap={8} direction="column" style={{ width: "160px" }}>
      {isPreviewSupported ? (
        <ImagePreview src={fileSrc} />
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
