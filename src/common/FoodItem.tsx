import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Pen from "../assets/pen-solid.svg";
import { db } from "../services";
import { theme } from "../theme";
import { FlexRow } from "./FlexRow";
import { NutritionTag } from "./NutritionTag";
import { useFoodData } from "../useFoodData";
import { VoteSummary } from "./VoteSummary";

const Item = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 4rem;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.24);
`;

const EditButton = styled.button`
  position: absolute;
  left: 0rem;
  top: 0rem;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  margin: 0;
  border: none;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.24);
`;

const PenIcon = styled(Pen)`
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  padding: 0.5rem;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5rem;
`;

const ItemMiddle = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 0.25rem;
`;

const Title = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
`;

const ImageContainer = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  background: #c4c4c4;
  border-radius: 8px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CircleItem = styled.li`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

interface Props {
  id: string;
  renderAugment: (data: db.FoodItemDoc) => React.ReactNode;
  editable?: boolean;
}

export const FoodItem: React.FC<Props> = ({ id, renderAugment, editable }) => {
  const history = useHistory();
  const { payload, isLoading } = useFoodData(id);

  return !isLoading && payload ? (
    <Item>
      {editable && (
        <EditButton
          type="button"
          onClick={() => history.push(`/cms/editfood/${id}`)}
        >
          <PenIcon />
        </EditButton>
      )}
      <Content>
        <ImageContainer>
          {payload.imageUrl && <Image src={payload.imageUrl} />}
        </ImageContainer>
        <ItemMiddle>
          <Title>{payload.name}</Title>
          <FlexRow gap="0.5rem">
            <FlexRow as="ul" gap="0.25rem">
              <CircleItem style={{ backgroundColor: "#CEEC97" }} />
              <CircleItem style={{ backgroundColor: "#FC60A8" }} />
              <CircleItem style={{ backgroundColor: "#F4B393" }} />
            </FlexRow>
            <VoteSummary
              upvotes={payload.upvotes}
              downvotes={payload.downvotes}
            />
          </FlexRow>
          <FlexRow as="ul" gap="0.5rem">
            <NutritionTag type="vegan" />
            <NutritionTag type="gluten_free" />
          </FlexRow>
        </ItemMiddle>
      </Content>
      {payload && renderAugment(payload)}
    </Item>
  ) : null;
};
