import React, { useRef } from "react";

import Viewer from "viewerjs";

import FlexWrapper from "../FlexWrapper";
import Typography from "../Typography";

import Attachment, { fromUUID } from "./attachment";

import ThumbnailPreview from "./ThumbnailPreview";

import "viewerjs/dist/viewer.css";

interface ThumbnailPreviewListProps {
  uuidList: { uuid: string }[];
}

const ThumbnailPreviewList: React.FC<ThumbnailPreviewListProps> = ({
  uuidList,
}: ThumbnailPreviewListProps) => {
  const fileList: Attachment[] = uuidList.map((file, _) => fromUUID(file.uuid));

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

  return (
    <div>
      {fileList.length > 0 ? (
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
              onClick={() => handleClick(index)}
              key={`${index.toString()}`}
              file={file}
            />
          ))}
        </FlexWrapper>
      ) : (
        <Typography
          fs={16}
          lh={20}
          color="GRAY.300"
          style={{ textAlign: "center" }}
        >
          업로드한 파일이 없습니다
        </Typography>
      )}
    </div>
  );
};

export default ThumbnailPreviewList;
