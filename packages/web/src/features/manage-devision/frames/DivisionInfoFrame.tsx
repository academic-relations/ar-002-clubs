import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import BasicInfoFrame from "@sparcs-clubs/web/features/manage-devision/components/BasicInfoFrame";

const DivisionInfoFrame: React.FC = () => (
  <FlexWrapper gap={40} direction="column">
    <FoldableSectionTitle title="분과 정보">
      <FlexWrapper gap={20} direction="row">
        <BasicInfoFrame />
        <Card outline padding="32px" style={{ flex: 1 }} />
      </FlexWrapper>
    </FoldableSectionTitle>
  </FlexWrapper>
);

export default DivisionInfoFrame;
