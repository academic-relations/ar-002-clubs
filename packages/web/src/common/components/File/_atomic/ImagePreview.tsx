import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

const ImagePreview = styled.img.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})`
  width: 160px;
  height: 160px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
`;

export default ImagePreview;
