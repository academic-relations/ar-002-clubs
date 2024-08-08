import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import colors from "@sparcs-clubs/web/styles/themes/colors";

interface NotificationCardProps {
  status: "Success" | "Error" | "Alert";
  header?: string;
  children?: React.ReactNode;
}

type NotificationColor = "RED" | "GREEN";

const icons = {
  Success: "check_circle",
  Error: "cancel",
  Alert: "error",
};

const NotificationBox = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ color: NotificationColor }>`
  border: 1px solid ${({ theme, color }) => theme.colors[color][600]};
  border-radius: 8px;

  background-color: ${({ theme, color }) => theme.colors[color][100]};
  padding: 12px 16px;
  width: 100%;
`;

const IconWrapper = styled.div`
  margin-top: 2px;
`;

const NotificationCard: React.FC<NotificationCardProps> = ({
  status = "Success",
  header = "",
  children = null,
}: NotificationCardProps) => {
  const color: NotificationColor = status === "Success" ? "GREEN" : "RED";
  const iconType = icons[status];

  return (
    <NotificationBox color={color}>
      <FlexWrapper gap={8} direction="row">
        <IconWrapper>
          <Icon type={iconType} size={20} color={colors[color][600]} />
        </IconWrapper>
        <FlexWrapper gap={8} direction="column">
          {header ?? (
            <Typography fw="MEDIUM" fs={16} lh={24}>
              {header}
            </Typography>
          )}
          {children}
        </FlexWrapper>
      </FlexWrapper>
    </NotificationBox>
  );
};

export default NotificationCard;
