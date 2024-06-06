import styled from "styled-components";

const ListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  font-size: 16px;
  line-height: 20px;

  &:before {
    content: "• ";
    padding-right: 8px;
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
export { ListItem, ListContainer };
