import React, { FC } from "react";

import TextButton from "./Buttons/TextButton";
import FlexWrapper from "./FlexWrapper";
import NotificationCard from "./NotificationCard";

interface InfoProps {
  title?: string;
  linkText?: string;
  onClickLink?: VoidFunction;
}

const WarningInfo: FC<React.PropsWithChildren<InfoProps>> = ({
  title = "",
  linkText = "",
  onClickLink = () => {},
  children = undefined,
}) => (
  <NotificationCard status="Alert" header={title}>
    <FlexWrapper gap={8} direction="column">
      {children && children}
      {linkText.length > 0 && (
        <TextButton
          text={linkText}
          color="GRAY"
          fw="REGULAR"
          onClick={onClickLink}
        />
      )}
    </FlexWrapper>
  </NotificationCard>
);

export default WarningInfo;
