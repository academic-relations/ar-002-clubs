import FlexWrapper from "../FlexWrapper";
import Typography from "../Typography";

import ThumbnailPreview from "./ThumbnailPreview";

interface ThumbnailPreviewListProps {
  fileList: {
    src: string;
    name: string;
  }[];
}

const ThumbnailPreviewList = ({ fileList }: ThumbnailPreviewListProps) => (
  <>
    {fileList.length > 0 ? (
      <FlexWrapper
        gap={16}
        direction="row"
        style={{
          overflow: "auto",
        }}
      >
        {fileList.map((file, index) => (
          <ThumbnailPreview
            key={`${index.toString()}`}
            fileSrc={file.src}
            fileName={file.name}
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
  </>
);

export default ThumbnailPreviewList;
