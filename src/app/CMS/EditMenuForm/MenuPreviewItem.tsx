import React from "react";
import styled from "styled-components";

import { useFoodData } from "../../useFoodData";

const ImageContainer = styled.div`
  width: 4rem;
  height: 4rem;
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
        <>
          <ImageContainer>
            {payload.imageUrl ? <Image src={payload.imageUrl} /> : payload.name}
          </ImageContainer>
          <button type="button" onClick={onRemoveClick}>
            Remove
          </button>
        </>
      )}
    </li>
  );
};
