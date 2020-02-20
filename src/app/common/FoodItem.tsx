import React from "react";
import styled from "styled-components";

import { db } from "../services";

const Item = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-gap: 0.5rem;
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

interface Props extends db.FoodItemDoc {}

export const FoodItem: React.FC<Props> = ({ id, name, imageUrl, rating }) => {
  return (
    <Item>
      <ImageContainer>{imageUrl && <Image src={imageUrl} />}</ImageContainer>
      <div>{name}</div>
      <div>{rating}</div>
    </Item>
  );
};
