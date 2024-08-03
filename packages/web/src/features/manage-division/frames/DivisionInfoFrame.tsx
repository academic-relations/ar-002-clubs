import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import ChangeDivisionPresidentCard from "@sparcs-clubs/web/features/manage-division/components/ChangeDivisionPresidentCard";
import DivisionInformationCard from "@sparcs-clubs/web/features/manage-division/components/DivisionInformationCard";

const DivisionInfoFrame: React.FC = () => (
  <FlexWrapper gap={40} direction="column">
    <FoldableSectionTitle title="분과 정보">
      <FlexWrapper gap={20} direction="row">
        <DivisionInformationCard />
        <ChangeDivisionPresidentCard />
      </FlexWrapper>
    </FoldableSectionTitle>
  </FlexWrapper>
);

export default DivisionInfoFrame;
