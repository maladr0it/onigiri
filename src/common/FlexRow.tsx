import styled from "styled-components";

export const FlexRow = styled.div<{ gap?: string }>`
  display: flex;
  align-items: center;

  & > :not(:first-child) {
    margin-left: ${(props) => props.gap || 0};
  }
`;
