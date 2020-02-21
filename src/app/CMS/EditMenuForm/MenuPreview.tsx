import React from "react";
import styled from "styled-components";
import { useField } from "formik";

import { FormValues } from "./EditMenuForm";
import { MenuPreviewItem } from "./MenuPreviewItem";

const Container = styled.div`
  height: 4rem;
  padding: 0 0.5rem;
  background: #fff;
  border-radius: 4px;
`;

const List = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const Placeholder = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  text-align: center;
`;

export const MenuPreview: React.FC = () => {
  const [field, _, helpers] = useField<FormValues["added"]>({ name: "added" });
  const foodItems = field.value;

  const handleRemove = (id: string) => {
    const value = field.value;
    helpers.setValue(value.filter((item) => item !== id));
  };

  return (
    <Container>
      {foodItems.length > 0 ? (
        <List>
          {foodItems.map((id) => (
            <MenuPreviewItem
              key={id}
              id={id}
              onRemoveClick={() => handleRemove(id)}
            />
          ))}
        </List>
      ) : (
        <Placeholder>
          Choose items from the list above for today's menu.
        </Placeholder>
      )}
    </Container>
  );
};
