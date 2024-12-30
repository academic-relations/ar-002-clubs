import styled from "styled-components";

export const ListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  font-size: 16px;
  line-height: 20px;
  word-wrap: break-word;
  list-style-position: inside;
  list-style-type: none;
  text-indent: -1em;
  padding-left: 1em;

  &:before {
    content: "• ";
    padding-right: 8px;
  }
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const IndentedItem = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  font-size: 16px;
  line-height: 24px;
  word-wrap: break-word;
  white-space: pre-wrap;
  padding-left: 24px; // TODO: (@dora) refactor
`;
