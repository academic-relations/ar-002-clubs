// TODO: Merge 하기 전에 지우기

"use client";

import ThumbnailPreview from "@sparcs-clubs/web/common/components/File/ThumbnailPreview";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

const Test = () => (
  <FlexWrapper gap={24} direction="column">
    <ThumbnailPreview
      fileUrl="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
      fileName="parrot.jpeg"
    />
    <ThumbnailPreview
      fileUrl="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
      fileName="parrot.pdf"
    />
    <ThumbnailPreview
      fileUrl="https://www.gstatic.com/webp/gallery/4.sm.webp"
      fileName="this-file-hase-very-long-name.webp"
    />
  </FlexWrapper>
);

export default Test;
