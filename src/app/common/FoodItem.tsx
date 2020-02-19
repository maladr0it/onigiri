import React from "react";
import styled from "styled-components";

import { db } from "../services";

const Item = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-gap: 0.5rem;
  &:nth-child(odd) {
    background: palegreen;
  }
`;

const ImageContainer = styled.div`
  width: 5rem;
  height: 5rem;
  background: lightgrey;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface Props {
  id: string;
  data?: db.FoodItemDoc;
}

export const FoodItem: React.FC<Props> = ({ data }) => {
  return (
    <Item>
      <ImageContainer>
        {data?.imageUrl && <Image src={data?.imageUrl} />}
      </ImageContainer>
      <div>{data?.name}</div>
      <div>{data?.rating}</div>
    </Item>
  );
};
