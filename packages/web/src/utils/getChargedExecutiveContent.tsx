import FlexWrapper from "../common/components/FlexWrapper";
import Typography from "../common/components/Typography";

const getChargedExecutiveContent = (
  prevExecutiveName: string,
  newExecutiveName: string,
) => {
  if (prevExecutiveName !== "" && newExecutiveName !== "") {
    return `${prevExecutiveName} → ${newExecutiveName}`;
  }
  if (prevExecutiveName === "" && newExecutiveName === "") {
    return (
      <FlexWrapper gap={4} direction="row">
        <Typography color="GRAY.300">(미정)</Typography>
        <Typography>→</Typography>
        <Typography color="GRAY.300">(미정)</Typography>
      </FlexWrapper>
    );
  }
  if (newExecutiveName === "") {
    return (
      <FlexWrapper gap={4} direction="row">
        <Typography>{prevExecutiveName} → </Typography>
        <Typography color="GRAY.300">(미정)</Typography>
      </FlexWrapper>
    );
  }
  return (
    <FlexWrapper gap={4} direction="row">
      <Typography color="GRAY.300">(미정)</Typography>
      <Typography>→ {newExecutiveName}</Typography>
    </FlexWrapper>
  );
};

export default getChargedExecutiveContent;
