import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import ChangeDivisionPresidentCard from "@sparcs-clubs/web/features/manage-devision/components/ChangeDivisionPresidentCard";
import DivisionInformationCard from "@sparcs-clubs/web/features/manage-devision/components/DivisionInformationCard";

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
