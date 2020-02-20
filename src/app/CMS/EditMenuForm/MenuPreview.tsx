import React from "react";
import styled from "styled-components";
import { useField } from "formik";

import { FormValues } from "./EditMenuForm";
import { MenuPreviewItem } from "./MenuPreviewItem";

const List = styled.ul`
  display: flex;
  height: 4rem;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`;

const Placeholder = styled.div`
  display: flex;
  /* hard-code height */
  height: 4rem;
  align-items: center;
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
    <>
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
    </>
  );
};
