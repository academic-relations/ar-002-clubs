import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import NotificationCard from "@sparcs-clubs/web/common/components/NotificationCard";
import Typography from "@sparcs-clubs/web/common/components/Typography";

type StatusType = "Requested" | "Completed";

interface MyChangeDivisionPresidentProps {
  status: StatusType;
  actingPresident?: boolean;
  change?: [string, string];
}

const statusString = {
  Requested: "요청",
  Completed: "완료",
};

const notificationStatus: Record<StatusType, "Alert" | "Success"> = {
  Requested: "Alert",
  Completed: "Success",
};

const MyChangeDivisionPresidentFrame: React.FC<
  MyChangeDivisionPresidentProps
> = ({
  status = "Requested",
  actingPresident = false,
  change = undefined,
}: MyChangeDivisionPresidentProps) => {
  const pronounString = actingPresident ? "학생회장 권한대행" : "학생회장";
  const divisionString = "'생활체육' 분과";
  const fullPronounString = `${divisionString}의 ${pronounString}`;
  const changeString =
    change === undefined ? "error" : `${change[0]} ⭢ ${change[1]}`;

  const headerString = `${pronounString} 변경 ${statusString[status]}`;
  const bodyString = `${fullPronounString} 변경이 다음과 같이 요청되었습니다: \n${changeString}`;

  const buttonString =
    status === "Requested" ? "클릭하여 더보기" : "분과 관리 페이지 바로가기";

  return (
    <NotificationCard status={notificationStatus[status]} header={headerString}>
      <FlexWrapper gap={8} direction="column">
        <Typography fs={16} lh={24}>
          {bodyString}
        </Typography>
        <TextButton text={buttonString} color="gray" fw="REGULAR" />
      </FlexWrapper>
    </NotificationCard>
  );
};

export default MyChangeDivisionPresidentFrame;
