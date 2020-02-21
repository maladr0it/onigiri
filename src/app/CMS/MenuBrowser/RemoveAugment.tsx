import React from "react";
import styled from "styled-components";

import { theme } from "../../theme";

interface Props {
  onClick: () => void;
}

const RemoveButton = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  font-size: 0.75rem;
  font-weight: bold;
  color: #fff;
  background-color: ${theme.lightRed};
`;

export const RemoveAugment: React.FC<Props> = ({ onClick }) => {
  return <RemoveButton onClick={onClick}>X</RemoveButton>;
};
