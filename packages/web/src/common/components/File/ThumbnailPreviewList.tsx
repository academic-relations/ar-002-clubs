import React, { useRef } from "react";

import Viewer from "viewerjs";

import FlexWrapper from "../FlexWrapper";

import Attachment from "./attachment";
import ThumbnailPreview from "./ThumbnailPreview";

import "viewerjs/dist/viewer.css";

interface ThumbnailPreviewListProps {
  fileList: Attachment[];
  onChange?: (files: Attachment[]) => void;
  disabled?: boolean;
}

const ThumbnailPreviewList: React.FC<ThumbnailPreviewListProps> = ({
  fileList,
  onChange = () => {},
  disabled = false,
}: ThumbnailPreviewListProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    const images = viewerRef.current!;

    const viewer = new Viewer(images, {
      hidden: () => {
        viewer.destroy();
      },
      initialViewIndex: index,
      title: [
        1,
        () =>
          `${fileList[viewer.index].name} (${viewer.index + 1} / ${fileList.length})`,
      ],
      toolbar: {
        prev: () => {
          viewer.prev(true);
        },
        next: () => {
          viewer.next(true);
        },
        download: () => {
          const fileSrc = fileList[viewer.index].src;

          fetch(fileSrc)
            .then(response => response.blob())
            .then(blob => {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = fileList[viewer.index].name;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            });
        },
      },
      navbar: false,
      url: "src",
    });

    viewer.show();
  };

  const onDelete = (file: Attachment) => {
    const newFileList = fileList.filter(f => f !== file);
    onChange(newFileList);
  };

  return (
    <div>
      <FlexWrapper
        gap={16}
        direction="row"
        style={{
          overflow: "auto",
          paddingBottom: "14px",
        }}
        ref={viewerRef}
      >
        {fileList.map((file, index) => (
          <ThumbnailPreview
            key={`${index.toString()}`}
            file={file}
            onClick={() => handleClick(index)}
            onDelete={onDelete}
            disabled={disabled}
          />
        ))}
      </FlexWrapper>
    </div>
  );
};

export default ThumbnailPreviewList;
