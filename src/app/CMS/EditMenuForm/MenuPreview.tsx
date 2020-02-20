import React from "react";
import styled from "styled-components";
import { useField } from "formik";

import { FormValues } from "./EditMenuForm";
import { MenuPreviewItem } from "./MenuPreviewItem";

export const MenuPreview: React.FC = () => {
  const [field, _, helpers] = useField<FormValues["added"]>({ name: "added" });
  const foodItems = field.value;

  const handleRemove = (id: string) => {
    const value = field.value;
    helpers.setValue(value.filter((item) => item !== id));
  };

  return (
    <div>
      <h1>MENU_PREVIEW</h1>
      <ul>
        {foodItems.map((id) => (
          <MenuPreviewItem key={id} id={id} onRemoveClick={handleRemove} />
        ))}
      </ul>
    </div>
  );
};
