import React from "react";
import styled from "styled-components";

import { theme } from "../../theme";
import Trash from "../../assets/trash-solid.svg";

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const TrashIcon = styled(Trash)`
  color: ${theme.darkGrey};
  width: 1rem;
`;

const RemoveButton = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
`;

interface Props {
  onClick: () => void;
}

export const RemoveAugment: React.FC<Props> = ({ onClick }) => {
  return (
    <Container>
      <RemoveButton onClick={onClick}>
        <TrashIcon />
      </RemoveButton>
    </Container>
  );
};
