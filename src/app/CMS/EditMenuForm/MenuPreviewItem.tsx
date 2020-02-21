import React from "react";
import styled from "styled-components";

import { theme } from "../../theme";
import { useFoodData } from "../../useFoodData";

const Button = styled.button`
  position: relative;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
`;

const Cross = styled.div`
  position: absolute;
  transform: translate(-25%, -25%);
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: grid;
  place-items: center;
  background-color: ${theme.lightRed};
  color: #fff;
`;

const ImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: ${theme.lightGrey};
  border-radius: 4px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface Props {
  id: string;
  onRemoveClick: () => void;
}

export const MenuPreviewItem: React.FC<Props> = ({ id, onRemoveClick }) => {
  const { isLoading, payload } = useFoodData(id);

  return (
    <li>
      {!isLoading && payload && (
        <Button type="button" onClick={onRemoveClick}>
          <Cross>X</Cross>
          <ImageContainer>
            {payload.imageUrl && <Image src={payload.imageUrl} />}
          </ImageContainer>
        </Button>
      )}
    </li>
  );
};
