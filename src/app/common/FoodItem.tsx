import React from "react";
import styled from "styled-components";

import { db } from "../services";

const Item = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 2px solid #efefef;
`;

const ItemMiddle = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
`;

const ImageContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  background: #c4c4c4;
  border-radius: 8px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TagList = styled.ul`
  display: flex;
  margin-top: 0.25rem;

  & > :not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const Tag = styled.li`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: #ededed;
`;

const AugmentContainer = styled.div`
  align-self: center;
`;

interface Props extends db.FoodItemDoc {
  augment: React.ReactNode;
}

export const FoodItem: React.FC<Props> = ({
  id,
  name,
  imageUrl,
  rating,
  augment,
}) => {
  return (
    <Item>
      <ImageContainer>{imageUrl && <Image src={imageUrl} />}</ImageContainer>
      <ItemMiddle>
        <div>{name}</div>
        <TagList>
          <Tag />
          <Tag />
          <Tag />
        </TagList>
      </ItemMiddle>
      <AugmentContainer>{augment}</AugmentContainer>
    </Item>
  );
};
