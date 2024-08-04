import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import NotificationCard from "@sparcs-clubs/web/common/components/NotificationCard";

import Typography from "@sparcs-clubs/web/common/components/Typography";
import { ChangeDivisionPresidentMessageContext } from "@sparcs-clubs/web/constants/changeDivisionPresident";

interface ChangeDivisionPresidentProps {
  status: "Requested" | "Canceled" | "Rejected";
  actingPresident: boolean;
  change?: [string, string];
}

const ChangeDivisionPresident: React.FC<ChangeDivisionPresidentProps> = ({
  status = "Requested",
  actingPresident = true,
  change = undefined,
}: ChangeDivisionPresidentProps) => {
  const notificationStatus = status === "Rejected" ? "Error" : "Success";
  const messageContext = new ChangeDivisionPresidentMessageContext({
    actingPresident,
    division: "'생활체육' 분과",
    status,
    page: "/manage-division",
    change,
  });

  return (
    <NotificationCard
      status={notificationStatus}
      header={messageContext.getHeader()}
    >
      <FlexWrapper gap={8} direction="column">
        <Typography fs={16} lh={24}>
          {messageContext.getBody()}
        </Typography>
        {status === "Requested" && (
          <Typography fs={16} lh={24}>
            {messageContext.getRequestNotice()}
          </Typography>
        )}
      </FlexWrapper>
    </NotificationCard>
  );
};

export default ChangeDivisionPresident;
