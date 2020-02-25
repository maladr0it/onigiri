// looks like a text input; holds tags

import React from "react";
import styled from "styled-components";
import { useField } from "formik";

import { theme } from "../../theme";
import { NutritionTag, ITag } from "../../common/NutritionTag";
import { FormValues } from "./FoodForm";
import { TagToggle } from "./TagToggle";

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: bold;
`;

const TagList = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  height: 2.375rem;
  border: 2px solid ${theme.lightGrey};
  background-color: #fff;
  border-radius: 2px;

  & > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`;

const Choices = styled.fieldset`
  display: flex;
`;

const CHOICES: ITag[] = ["vegan", "gluten_free"];

interface Props {
  label: string;
  name: string;
}

export const TagInput: React.FC<Props> = ({ label, name }) => {
  const [field] = useField<FormValues["tags"]>({ name, type: "chekbox" });

  console.log(field);

  return (
    <div>
      <Label>{label}</Label>
      <TagList>
        {field.value.map((value, i) => (
          <NutritionTag key={i} type={value} />
        ))}
      </TagList>
      <Choices>
        {CHOICES.map((choice) => (
          <TagToggle key={choice} name="tags" value={choice} />
        ))}
      </Choices>
    </div>
  );
};
