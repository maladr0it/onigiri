import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { db } from "../services";
import { theme } from "../theme";
import { useFoodData } from "../useFoodData";

const Item = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 4rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.24);
`;

const EditButton = styled.button`
  position: absolute;
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

const TagList = styled.ul`
  display: flex;
  margin-top: 0.25rem;

  & > :not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const Tag = styled.li`
  font-size: 0.75rem;
  border-radius: 4px;
  background-color: ${theme.lightGrey};
  color: ${theme.textOnBg};
  padding: 0.25rem;
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
          EDIT
        </EditButton>
      )}
      <Content>
        <ImageContainer>
          {payload.imageUrl && <Image src={payload.imageUrl} />}
        </ImageContainer>
        <ItemMiddle>
          <Title>{payload.name}</Title>
          <div style={{ fontSize: "0.875rem" }}>
            Rating: {payload.rating || "0"}%
          </div>
          <TagList>
            <Tag>Gluten-free</Tag>
            <Tag>Vegan</Tag>
          </TagList>
        </ItemMiddle>
      </Content>
      {payload && renderAugment(payload)}
    </Item>
  ) : null;
};
